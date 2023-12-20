import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { channelDto } from '../dto/channel.create.dto';

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  //GET MANY
  async getChannels(id_user: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_user,
      },
    });
    if (!user)
      return {
        message: 'No such user !',
        object: null,
      };
    const channels = await this.prisma.channel.findMany({
      include: {
        users: true,
        messages: true,
        rooms: true,
        bannedUsers: true,
      },
    });
    if (!channels)
      return {
        message: 'There is no channels !',
        object: null,
      };
    const channelsFiltred = channels.map((channel) => {
      if (
        !channel.users.find((user) => user.id_user === id_user) &&
        !channel.bannedUsers.find((user) => user.id_user === id_user)
      )
        return channel;
    });
    const result = channelsFiltred.filter((channel) => channel);
    if (result.length === 0)
      return {
        message: 'There is no channels to join !',
        object: null,
      };

    return {
      message: 'Channels found',
      object: result,
    };
  }

  //GET MEMBERS
  async getMembers(id_user: string, id_channel: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_user,
      },
    });
    if (!user)
      return {
        message: 'No such user !',
        object: null,
      };
    const rooms = await this.prisma.room_Chat.findMany({
      where: {
        id_channel: id_channel,
        lefted: false,
      },
    });
    if (!rooms)
      return {
        message: 'There is no room chat !',
        object: null,
      };
    const usersFiltred = await Promise.all(
      rooms.map(async (room) => {
        const user = await this.prisma.user.findUnique({
          where: { id_user: room.id_user },
          select: {
            id_user: true,
            username: true,
            avatar: true,
            status: true,
          },
        });
        if (user) {
          return {
            user,
            user_role: room.user_role,
            member_status: room.member_status,
          };
        }
      }),
    );
    const result = await Promise.all(usersFiltred.filter((user) => user));
    if (!result)
      return {
        message: 'No such channel !',
        object: null,
      };
    return {
      message: 'Channel found',
      object: result,
    };
  }

  //GET
  async getChannel(id_channel: string) {
    const result = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
      include: {
        users: true,
        rooms: true,
        messages: true,
        bannedUsers: true,
      },
    });
    if (!result)
      return {
        message: 'No such channel !',
        object: null,
      };
    return {
      message: 'Channel found',
      object: result,
    };
  }

  //DELETE MANY
  async deleteChannels() {
    const rooms = await this.prisma.room_Chat.deleteMany();
    if (!rooms)
      return {
        message: "Can't delete rooms !",
        object: null,
      };
    const result = await this.prisma.channel.deleteMany();
    return {
      message: 'Channels Deleted Succesfully',
      object: result,
    };
  }

  //DELETE
  async deleteChannel(id_channel: string) {
    if (!id_channel)
      return {
        message: 'No such channel !',
        object: null,
      };
    const rooms = await this.prisma.room_Chat.deleteMany({
      where: { id_channel: id_channel },
    });
    if (!rooms)
      return {
        message: "Can't delete rooms !",
        object: null,
      };
    const result = await this.prisma.channel.delete({
      where: {
        id_channel: id_channel,
      },
    });
    if (!result)
      return {
        message: 'No channel to delete !',
        object: null,
      };
    return {
      message: 'Channel Deleted Succesfully',
      object: result,
    };
  }

  //POST
  async postChannel(channel: channelDto, id_user: string) {
    if (!channel)
      return {
        message: 'Empty Channel',
        object: null,
      };
    if (channel.type === 'PROTECTED' && !channel.hash)
      return {
        message: 'Password Obligatoire !',
        object: null,
      };
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_user,
      },
    });
    if (!user)
      return {
        message: 'No such User !',
        object: null,
      };
    const result = await this.prisma.channel.create({
      data: {
        name: channel.name,
        description: channel.description,
        avatar: channel.avatar,
        hash: channel.hash,
        type: channel.type,
        created_at: channel.created_at,
        updated_at: channel.updated_at,
        users: {
          connect: { id_user: id_user },
        },
      },
    });

    const room = await this.prisma.room_Chat.create({
      data: {
        id_channel: result.id_channel,
        id_user: id_user,
        user_role: 'OWNER',
        lefted: false,
      },
    });
    if (!room)
      return {
        message: "Can't create a room chat !",
        object: null,
      };
    return {
      message: 'Channel Created Succefully',
      object: result,
    };
  }

  //POST DIRECT
  async postChannelDirect(id_user: string, id_friend: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_user,
      },
    });
    const freind = await this.prisma.user.findUnique({
      where: {
        id_user: id_friend,
      },
    });
    if (!user || !freind)
      return {
        message: 'No such User !',
        object: null,
      };
    const duplicate = await this.prisma.channel.findMany({
      where: {
        type: 'DIRECT',
        users: {
          some: {
            id_user: id_user,
          },
        },
      },
      include: { users: true, rooms: true, messages: true },
    });
    const mychannel = duplicate.find((channel) =>
      channel.users.find((user) => user.id_user === freind.id_user),
    );
    if (mychannel) {
      return {
        message: 'Channel founded successfully',
        object: mychannel,
      };
    }

    const users = [{ id_user: id_user }, { id_user: freind.id_user }];
    const newchannel = await this.prisma.channel.create({
      data: {
        name: user.username + freind.username,
        type: 'DIRECT',
        users: {
          connect: users,
        },
      },
      include: { users: true, rooms: true, messages: true },
    });

    const myroom = await this.prisma.room_Chat.create({
      data: {
        id_channel: newchannel.id_channel,
        id_user: id_user,
        user_role: 'MEMBER',
        lefted: false,
      },
    });
    const room = await this.prisma.room_Chat.create({
      data: {
        id_channel: newchannel.id_channel,
        id_user: freind.id_user,
        user_role: 'MEMBER',
        lefted: false,
      },
    });
    if (!room || !myroom)
      return {
        message: "Can't create a room chat !",
        object: null,
      };
    const result = await this.prisma.channel.findUnique({
      where: {
        id_channel: newchannel.id_channel,
      },
      include: { users: true, rooms: true, messages: true },
    });
    return {
      message: 'Channel Created Succefully',
      object: result,
    };
  }

  //DELETE DIRECT
  async deleteChannelDirect(id_user: string, id_friend: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_user,
      },
    });
    const freind = await this.prisma.user.findUnique({
      where: {
        id_user: id_friend,
      },
    });
    if (!user || !freind)
      return {
        message: 'No such User !',
        object: null,
      };
    const duplicate = await this.prisma.channel.findMany({
      where: {
        type: 'DIRECT',
        users: {
          some: {
            id_user: id_user,
          },
        },
      },
      include: { users: true, rooms: true, messages: true },
    });
    const mychannel = duplicate.find((channel) =>
      channel.users.find((user) => user.id_user === freind.id_user),
    );
    if (!mychannel) {
      return {
        message: 'No Channel to delete',
        object: null,
      };
    }
    const messages = await this.prisma.message.deleteMany({
      where: {
        id_channel: mychannel.id_channel,
      },
    });
    const myroom = await this.prisma.room_Chat.delete({
      where: {
        id_channel_id_user: {
          id_channel: mychannel.id_channel,
          id_user: id_user,
        },
      },
    });
    const room = await this.prisma.room_Chat.delete({
      where: {
        id_channel_id_user: {
          id_channel: mychannel.id_channel,
          id_user: freind.id_user,
        },
      },
    });
    if (!room || !myroom || !messages)
      return {
        message: "Can't delete a room chat / messages !",
        object: null,
      };
    const result = await this.prisma.channel.delete({
      where: {
        id_channel: mychannel.id_channel,
      },
    });
    return {
      message: 'Channel deleted Succefully',
      object: result,
    };
  }
}
