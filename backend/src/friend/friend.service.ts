import { Injectable } from '@nestjs/common';
import { ChannelService } from 'src/chat/channel/channel.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class friendService {
  constructor(
    private prisma: PrismaService,
    private channel: ChannelService,
  ) {}

  async getFriends(id_user: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
    });
    if (!user)
      return {
        message: 'No such User !',
        Object: null,
      };
    const blockedFriends = await this.prisma.friendship.findMany({
      where: {
        OR: [{ id_user: user.id_user }, { id_friend: user.id_user }],
        state: 'BLOCKED',
        blocker_User: id_user,
      },
    });
    const acceptedFriends = await this.prisma.friendship.findMany({
      where: {
        OR: [{ id_user: user.id_user }, { id_friend: user.id_user }],
        state: 'ACCEPTED',
      },
    });
    const pendingFriends = await this.prisma.friendship.findMany({
      where: {
        id_friend: user.id_user,
        state: 'PENDING',
      },
    });

    const accepted = await Promise.all(
      acceptedFriends.map(async (friend) => {
        let id = friend.id_user;
        if (id === id_user) id = friend.id_friend;
        return await this.prisma.user.findUnique({
          where: { id_user: id },
          select: { username: true, avatar: true, status: true },
        });
      }),
    );
    const blocked = await Promise.all(
      blockedFriends.map(async (friend) => {
        let id = friend.id_user;
        if (id === id_user) id = friend.id_friend;
        return await this.prisma.user.findUnique({
          where: { id_user: id },
          select: { username: true, avatar: true, status: true },
        });
      }),
    );
    const pending = await Promise.all(
      pendingFriends.map(async (friend) => {
        let id = friend.id_user;
        if (id === id_user) id = friend.id_friend;

        return await this.prisma.user.findUnique({
          where: { id_user: id },
          select: { username: true, avatar: true, status: true },
        });
      }),
    );
    const result = { accepted, blocked, pending };

    if (!result)
      return {
        message: 'There is no friends !',
        Object: null,
      };
    return {
      message: 'Friends founded',
      Object: result,
    };
  }

  //GET SEARCH
  async searchFriends(id_user: string) {
    const my_user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
      include: { blocked_user: true, blocked_from: true },
    });
    if (!my_user)
      return {
        message: 'No such User !',
        Object: null,
      };

    const allUsers = await this.prisma.user.findMany({
      where: {
        NOT: {
          id_user: my_user.id_user,
        },
      },
      include: { blocked_user: true, blocked_from: true },
    });

    const users = await Promise.all(
      allUsers.map((user) => {
        if (
          user.blocked_user.filter((block) => block.id_user === my_user.id_user)
            .length != 1 &&
          user.blocked_from.filter((block) => block.id_user === my_user.id_user)
            .length != 1
        )
          return user;
      }),
    );
    const filtredUsers = users.filter((user) => user);
    const result = filtredUsers.map((user) => {
      return {
        username: user.username,
        avatar: user.avatar,
        status: user.status,
      };
    });
    if (!result)
      return {
        message: 'There is no friends !',
        Object: null,
      };
    return {
      message: 'Friends founded',
      Object: result,
    };
  }

  //POST
  async postFriend(id_user: string, username: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
    });
    const friend = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user || !friend || user.id_user === friend.id_user)
      return {
        message: 'No such User !',
        Object: null,
      };
    const duplicate = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          {
            id_user: user.id_user,
            id_friend: friend.id_user,
          },
          {
            id_user: friend.id_user,
            id_friend: user.id_user,
          },
        ],
      },
    });
    if (duplicate)
      return {
        message: 'Duplicated founded',
        Object: null,
      };
    const result = await this.prisma.friendship.create({
      data: {
        id_user: user.id_user,
        id_friend: friend.id_user,
        state: 'PENDING',
      },
    });
    if (!result)
      return {
        message: "Can't create a friendship !",
        Object: null,
      };
    return {
      message: 'Friendship Created Succefully',
      Object: result,
    };
  }

  //PUT ACCEPTED
  async acceptFriend(id_user: string, username: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
    });
    const friend = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user || !friend || user.id_user === friend.id_user)
      return {
        message: 'No such User !',
        Object: null,
      };
    const duplicate = await this.prisma.friendship.findFirst({
      where: {
        id_user: friend.id_user,
        id_friend: user.id_user,
        state: 'PENDING',
      },
    });
    if (!duplicate)
      return {
        message: 'There is no friendship !',
        Object: null,
      };
    const result = await this.prisma.friendship.update({
      where: {
        id_friendship: duplicate.id_friendship,
      },
      data: {
        state: 'ACCEPTED',
      },
    });
    const updateUser = await this.prisma.user.update({
      where: {
        id_user: id_user,
      },
      data: {
        friend_user: {
          connect: {
            id_user: friend.id_user,
          },
        },
      },
    });
    if (!result || !updateUser)
      return {
        message: "Can't update a friendship !",
        Object: null,
      };
    return {
      message: 'Friendship Updated Succefully',
      Object: result,
    };
  }

  //DELETE REFUSED
  async refuseFriend(id_user: string, username: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
    });
    const friend = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user || !friend || user.id_user === friend.id_user)
      return {
        message: 'No such User !',
        Object: null,
      };
    const duplicate = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          {
            id_user: user.id_user,
            id_friend: friend.id_user,
          },
          {
            id_user: friend.id_user,
            id_friend: user.id_user,
          },
        ],
        state: { in: ['ACCEPTED', 'PENDING'] },
      },
    });
    if (!duplicate)
      return {
        message: 'There is no friendship !',
        Object: null,
      };
    const result = await this.prisma.friendship.delete({
      where: {
        id_friendship: duplicate.id_friendship,
      },
    });
    if (!result)
      return {
        message: "Can't delete a friendship !",
        Object: null,
      };
    return {
      message: 'Friendship Deleted Succefully',
      Object: result,
    };
  }

  //PUT BLOCKED
  async blockFriend(id_user: string, username: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
    });
    const friend = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user || !friend || user.id_user === friend.id_user)
      return {
        message: 'No such User !',
        Object: null,
      };
    const duplicate = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { id_user: user.id_user, id_friend: friend.id_user },
          { id_user: friend.id_user, id_friend: user.id_user },
        ],
      },
    });

    let result;
    if (!duplicate) {
      result = await this.prisma.friendship.create({
        data: {
          id_user: id_user,
          blocker_User: id_user,
          id_friend: friend.id_user,
          state: 'BLOCKED',
        },
      });
    } else {
      if (duplicate.state === 'BLOCKED') return;
      result = await this.prisma.friendship.update({
        where: {
          id_friendship: duplicate.id_friendship,
        },
        data: {
          state: 'BLOCKED',
          blocker_User: id_user,
        },
      });
    }

    const updateUser = await this.prisma.user.update({
      where: {
        id_user: id_user,
      },
      data: {
        blocked_user: {
          connect: {
            id_user: friend.id_user,
          },
        },
        friend_user: { disconnect: { id_user: friend.id_user } },
      },
    });
    const deleteDirect = await this.channel.deleteChannelDirect(
      id_user,
      friend.username,
    );
    if (!result || !updateUser || !deleteDirect)
      return {
        message: "Can't update a friendship !",
        Object: null,
      };
    return {
      message: 'Friendship Updated Succefully',
      Object: result,
    };
  }

  //PUT UNBLOCK
  async unblockFriend(id_user: string, username: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
    });
    const friend = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user || !friend || user.id_user === friend.id_user)
      return {
        message: 'No such User !',
        Object: null,
      };
    const duplicate = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { id_user: user.id_user, id_friend: friend.id_user },
          { id_user: friend.id_user, id_friend: user.id_user },
        ],
        state: 'BLOCKED',
        blocker_User: id_user,
      },
    });
    if (!duplicate)
      return {
        message: 'There is no friendship !',
        Object: null,
      };
    const updateUser = await this.prisma.user.update({
      where: {
        id_user: id_user,
      },
      data: {
        blocked_user: {
          disconnect: {
            id_user: friend.id_user,
          },
        },
      },
    });
    const result = await this.prisma.friendship.delete({
      where: {
        id_friendship: duplicate.id_friendship,
      },
    });
    if (!result || !updateUser)
      return {
        message: "Can't update a friendship !",
        Object: null,
      };
    return {
      message: 'Friendship Updated Succefully',
      Object: result,
    };
  }

  //DELETE
  async deleteFriend(id_user: string, username: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
    });
    const friend = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user || !friend || user.id_user === friend.id_user)
      return {
        message: 'No such User !',
        Object: null,
      };
    const duplicate = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { id_user: user.id_user, id_friend: friend.id_user },
          { id_user: friend.id_user, id_friend: user.id_user },
        ],
        state: 'ACCEPTED',
      },
    });
    if (!duplicate)
      return {
        message: 'There is no friendship !',
        Object: null,
      };
    const result = await this.prisma.friendship.delete({
      where: {
        id_friendship: duplicate.id_friendship,
      },
    });
    const updateUser = await this.prisma.user.update({
      where: {
        id_user: duplicate.id_user,
      },
      data: {
        friend_user: {
          disconnect: {
            id_user: duplicate.id_friend,
          },
        },
      },
    });
    if (!result || !updateUser)
      return {
        message: "Can't delete a friendship !",
        Object: null,
      };
    return {
      message: 'Friendship Deleted Succefully',
      Object: result,
    };
  }
}
