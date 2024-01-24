import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChannelService } from './channel.service';
import { channelDto } from '../dto/channel.create.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChannelUpdateService {
  constructor(
    private prisma: PrismaService,
    private channelService: ChannelService,
  ) {}

  //JOIN PRIVATE
  async joinPrivateChannel(
    id_user: string,
    id_friend: string,
    id_channel: string,
  ) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
        type: 'PRIVATE',
      },
      include: { users: true, bannedUsers: true },
    });
    if (!channel)
      return {
        message: 'No such Channel !',
        Object: null,
      };
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_user,
      },
      include: { blocked_from: true, blocked_user: true },
    });
    const friend = await this.prisma.user.findUnique({
      where: {
        id_user: id_friend,
      },
    });
    if (!user || !friend)
      return {
        message: 'No such User !',
        Object: null,
      };
    const room = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
        user_role: 'OWNER',
      },
    });
    if (!room)
      return {
        message: "You can't invite users to this channel !",
        Object: null,
      };
    const joined = channel.users.some((user) => {
      return user.id_user === id_friend;
    });
    const banned = channel.bannedUsers.some((user) => {
      return user.id_user === id_friend;
    });
    const blocked = user.blocked_user.some((user) => {
      return user.id_user === id_friend;
    });
    const blockedFrom = user.blocked_from.some((user) => {
      return user.id_user === id_friend;
    });
    if (joined)
      return {
        message: 'Already joined !',
        Object: null,
      };
    if (banned)
      return {
        message: 'The user is banned !',
        Object: null,
      };
    if (blocked || blockedFrom)
      return {
        message: 'The user is blocked !',
        Object: null,
      };
    const new_room = await this.prisma.room_Chat.upsert({
      where: {
        id_channel_id_user: {
          id_channel: id_channel,
          id_user: id_friend,
        },
      },
      update: {
        user_role: 'MEMBER',
        lefted: false,
        lefted_at: null,
      },
      create: {
        id_channel: id_channel,
        id_user: id_friend,
        user_role: 'MEMBER',
        lefted: false,
      },
    });
    if (!new_room)
      return {
        message: "Can't upsert a room chat !",
        Object: null,
      };

    const check = await this.prisma.channel.findFirst({
      where: {
        id_channel: id_channel,
        type: 'PRIVATE',
      }
    });
    if (!check){
      return {
        message: "Can't update channel !",
        Object: null,
      };
    }
      const result = await this.prisma.channel.update({
        where: {
          id_channel: id_channel,
          type: 'PRIVATE',
        },
        include: { users: true, rooms: true },
        data: {
          users: {
            connect: { id_user: id_friend },
          },
          rooms: {
            connect: {
              id_channel_id_user: { id_channel: id_channel, id_user: id_friend },
            },
          },
        },
      });
    return {
      message: 'Channel Updated Succefully',
      Object: result,
    };
  }

  //PUT
  async putchannel(id_user: string, id_channel: string, channel: channelDto) {
    const chan_name = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
    });
    if (!channel || !id_channel || !chan_name)
      return {
        message: 'No channel to set',
        Object: null,
      };
    const room = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: chan_name.id_channel,
          id_user: id_user,
        },
        user_role: 'OWNER',
      },
    });
    if (!room) {
      return {
        message: "You can't update this channel !",
        Object: null,
      };
    }
    let updated: channelDto = {
      name: chan_name.name,
      description: chan_name.description,
      avatar: chan_name.avatar,
      hash: chan_name.hash,
      type: chan_name.type,
    };
    if (
      channel.name !== undefined &&
      chan_name.name !== channel.name &&
      channel.name
    )
      updated.name = channel.name;
    if (
      channel.description !== undefined &&
      chan_name.description !== channel.description &&
      channel.description
    )
      updated.description = channel.description;
    if (
      channel.avatar !== undefined &&
      chan_name.avatar !== channel.avatar &&
      channel.avatar
    )
      updated.avatar = channel.avatar;
    if (channel.hash !== undefined && channel.hash) {
      const salt = await bcrypt.genSalt();
      updated.hash = await bcrypt.hash(channel.hash, salt);
    }
    if (
      channel.type !== undefined &&
      chan_name.type !== channel.type &&
      channel.type
    ) {
      if (
        channel.type === 'PROTECTED' &&
        (!channel.hash || channel.hash === undefined)
      )
        return {
          message: 'Password Obligatoire !',
          Object: null,
        };
      updated.type = channel.type;
    }
    const result = await this.prisma.channel.update({
      where: {
        id_channel: id_channel,
      },
      data: {
        name: updated.name,
        description: updated.description,
        avatar: updated.avatar,
        hash: updated.hash,
        type: updated.type,
      },
    });
    if (!result)
      return {
        message: "Can't update Channel !",
        Object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      Object: result,
    };
  }

  //JOIN CHANNEL
  async joinChannel(id_user: string, id_channel: string, password: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
      include: { users: true, bannedUsers: true },
    });
    if (!channel)
      return {
        message: 'No such Channel !',
        Object: null,
      };
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_user,
      },
    });
    if (!user)
      return {
        message: 'No such User !',
        Object: null,
      };
    const joined = channel.users.some((user) => {
      return user.id_user === id_user;
    });
    const banned = channel.bannedUsers.some((user) => {
      return user.id_user === id_user;
    });
    if (joined)
      return {
        message: 'Already joined !',
        Object: null,
      };
    if (banned)
      return {
        message: 'The user is banned !',
        Object: null,
      };
    if (channel.type === 'PROTECTED') {
      if (!(await bcrypt.compare(password, channel.hash)))
        return {
          message: 'Password Incorrect',
          Object: null,
        };
    }
    const room = await this.prisma.room_Chat.upsert({
      where: {
        id_channel_id_user: {
          id_channel: id_channel,
          id_user: id_user,
        },
      },
      update: {
        user_role: 'MEMBER',
        lefted: false,
        lefted_at: null,
      },
      create: {
        id_channel: id_channel,
        id_user: id_user,
        user_role: 'MEMBER',
        lefted: false,
      },
    });
    if (!room)
      return {
        message: "Can't upsert a room chat !",
        Object: null,
      };
    const result = await this.prisma.channel.update({
      where: {
        id_channel: id_channel,
      },
      include: { users: true, rooms: true },
      data: {
        users: {
          connect: { id_user: id_user },
        },
        rooms: {
          connect: {
            id_channel_id_user: { id_channel: id_channel, id_user: id_user },
          },
        },
      },
    });
    return {
      message: 'Channel Updated Succefully',
      Object: result,
    };
  }

  //leave channel
  async leaveChannel(id_user: string, id_channel: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
      include: { users: true },
    });
    if (!channel)
      return {
        message: 'No such Channel !',
        Object: null,
      };
    const joined = channel.users.some((user) => {
      return user.id_user === id_user;
    });
    if (!joined)
      return {
        message: 'The user is not a member in this Channel !',
        Object: null,
      };
    const result = await this.prisma.channel.update({
      where: {
        id_channel: id_channel,
      },
      include: { users: true },
      data: {
        users: {
          disconnect: { id_user: id_user },
        },
      },
    });
    if (!result)
      return {
        message: "Can't update a channel !",
        Object: null,
      };
    const my_room = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: id_channel,
          id_user: id_user,
        },
        lefted: false,
      },
    });
    if (!my_room)
      return {
        message: "Can't find a room chat !",
        Object: null,
      };
    const room = await this.prisma.room_Chat.update({
      where: {
        id_channel_id_user: {
          id_channel: id_channel,
          id_user: id_user,
        },
        lefted: false,
      },
      data: {
        lefted: true,
        user_role: 'MEMBER',
        lefted_at: new Date(),
      },
    });
    if (!room)
      return {
        message: "Can't delete a room chat !",
        Object: null,
      };
    if (result.users.length === 0) {
      const channel = await this.channelService.deleteChannel(
        result.id_channel,
      );
      if (!channel.Object)
        return {
          message: "Can't delete a channel !",
          Object: null,
        };
      return {
        message: 'Channel Updated Succefully',
        Object: result,
      };
    }
    if (my_room.user_role === 'OWNER') {
      const newOwner = await this.prisma.room_Chat.findFirst({
        where: {
          id_channel: id_channel,
          lefted: false,
          member_status: 'NONE',
          NOT: { user_role: 'OWNER' },
        },
      });
      if (!newOwner) {
        const deleteMessages = await this.prisma.message.deleteMany({
          where: { id_channel: id_channel },
        });
        const deleteRooms = await this.prisma.room_Chat.deleteMany({
          where: { id_channel: id_channel },
        });
        const deleteChannel = await this.prisma.channel.delete({
          where: { id_channel: id_channel },
        });
        if (!deleteChannel || !deleteMessages || !deleteRooms)
          return {
            message: "Can't delete the channel !",
            Object: null,
          };
        return {
          message: "Can't update a room chat !",
          Object: null,
        };
      }
      const updatedRoom = await this.prisma.room_Chat.update({
        where: {
          name: newOwner.name,
        },
        data: {
          user_role: 'OWNER',
        },
      });
      if (!updatedRoom)
        return {
          message: "Can't update a room chat !",
          Object: null,
        };
    }
    return {
      message: 'Channel Updated Succefully',
      Object: result,
    };
  }

  //kick User
  async kickUser(id_user: string, id_friend: string, id_channel: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
      include: { users: true },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_friend,
      },
    });
    if (!user)
      return {
        message: 'No such user !',
        Object: null,
      };
    if (!channel)
      return {
        message: 'No such channel !',
        Object: null,
      };
    const iskicker = channel.users.some((user) => {
      return user.id_user === id_user;
    });
    const iskicked = channel.users.some((user) => {
      return user.id_user === id_friend;
    });
    if (!iskicker || !iskicked)
      return {
        message: 'The user is not a member in this Channel !',
        Object: null,
      };
    const kicker = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: id_user,
        },
        lefted: false,
      },
    });
    const kicked = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
        lefted: false,
      },
    });
    if (!kicker || !kicked)
      return {
        message: "Can't find a room chat !",
        Object: null,
      };
    if (kicked.user_role === 'OWNER')
      return {
        message: "You can't kick the owner !",
        Object: null,
      };
    if (kicker.user_role === 'MEMBER')
      return {
        message: "You can't kick !",
        Object: null,
      };
    if (kicked.user_role === 'ADMIN' && kicker.user_role !== 'OWNER')
      return {
        message: "You can't kick the admin !",
        Object: null,
      };
    const result = await this.prisma.channel.update({
      where: {
        id_channel: id_channel,
      },
      include: { users: true },
      data: {
        users: {
          disconnect: { id_user: user.id_user },
        },
      },
    });
    if (!result)
      return {
        message: "Can't update a channel !",
        Object: null,
      };
    const check = await this.prisma.room_Chat.findFirst({
      where: {
        id_channel: result.id_channel,
        id_user: user.id_user,
        lefted: false,
      },
    });
    if (!check)
    return {
      message: "Can't update a room_chat !",
      Object: null,
    };
    const room = await this.prisma.room_Chat.update({
      where: {
        id_channel_id_user: {
          id_channel: result.id_channel,
          id_user: user.id_user,
        },
        lefted: false,
      },
      data: {
        lefted: true,
        user_role: 'MEMBER',
        lefted_at: new Date(),
      },
    });
    if (!room)
      return {
        message: "Can't update a room chat !",
        Object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      Object: result,
    };
  }

  //SET ADMIN
  async setAdmin(id_user: string, id_friend: string, id_channel: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
      include: { users: true },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_friend,
      },
    });
    if (!user)
      return {
        message: 'No such user !',
        Object: null,
      };
    if (!channel)
      return {
        message: 'No such channel !',
        Object: null,
      };
    const isOwner = channel.users.some((user) => {
      return user.id_user === id_user;
    });
    const isMember = channel.users.some((user) => {
      return user.id_user === id_friend;
    });
    if (!isOwner || !isMember)
      return {
        message: 'The user is not a member in this Channel !',
        Object: null,
      };
    const owner = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: id_user,
        },
        lefted: false,
      },
    });
    const member = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
        lefted: false,
      },
    });
    if (!owner || !member)
      return {
        message: "Can't find a room chat !",
        Object: null,
      };
    if (owner.user_role !== 'OWNER')
      return {
        message: "You can't set a member as admin !",
        Object: null,
      };
    if (member.user_role !== 'MEMBER')
      return {
        message: 'The user is an admin !',
        Object: null,
      };
    if (owner.name === member.name)
      return {
        message: "You can't set yourself as a admin !",
        Object: null,
      };
    const check = await this.prisma.room_Chat.findFirst({
      where: {
        id_channel: channel.id_channel,
        id_user: user.id_user,
        lefted: false,
      },
    });
    if (!check)
    return {
      message: "Can't find a room chat !",
      Object: null,
    };
    const result = await this.prisma.room_Chat.update({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
        lefted: false,
      },
      data: {
        user_role: 'ADMIN',
      },
    });
    if (!result)
      return {
        message: "Can't update a room chat !",
        Object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      Object: result,
    };
  }

  //SET MEMBER
  async setMember(id_user: string, id_friend: string, id_channel: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
      include: { users: true },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_friend,
      },
    });
    if (!user)
      return {
        message: 'No such user !',
        Object: null,
      };
    if (!channel)
      return {
        message: 'No such channel !',
        Object: null,
      };
    const isOwner = channel.users.some((user) => {
      return user.id_user === id_user;
    });
    const idAdmin = channel.users.some((user) => {
      return user.id_user === id_friend;
    });
    if (!isOwner || !idAdmin)
      return {
        message: 'The user is not a member in this Channel !',
        Object: null,
      };
    const owner = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: id_user,
        },
        lefted: false,
      },
    });
    const admin = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
        lefted: false,
      },
    });
    if (!owner || !admin)
      return {
        message: "Can't find a room chat !",
        Object: null,
      };
    if (owner.user_role !== 'OWNER')
      return {
        message: "You can't set a admin as member !",
        Object: null,
      };
    if (admin.user_role === 'OWNER')
      return {
        message: 'You are the owner !',
        Object: null,
      };
    if (admin.user_role !== 'ADMIN')
      return {
        message: 'The user is a member !',
        Object: null,
      };
    if (owner.name === admin.name)
      return {
        message: "You can't set yourself as a member!",
        Object: null,
      };
      const check = await this.prisma.room_Chat.findFirst({
        where: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
          lefted: false,
        },
      });
      if (!check)
      return {
        message: "Can't find a room chat !",
        Object: null,
      };
    const result = await this.prisma.room_Chat.update({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
        lefted: false,
      },
      data: {
        user_role: 'MEMBER',
      },
    });
    if (!result)
      return {
        message: "Can't update a room chat !",
        Object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      Object: result,
    };
  }

  //BAN MEMBER
  async banMember(id_user: string, id_friend: string, id_channel: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
      include: { users: true },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_friend,
      },
    });
    if (!user)
      return {
        message: 'No such user !',
        Object: null,
      };
    if (!channel)
      return {
        message: 'No such channel !',
        Object: null,
      };
    const isAdmin = channel.users.some((user) => {
      return user.id_user === id_user;
    });
    const isMember = channel.users.some((user) => {
      return user.id_user === id_friend;
    });
    if (!isAdmin || !isMember)
      return {
        message: 'The user is not a member in this Channel !',
        Object: null,
      };
    const admin = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: id_user,
        },
        lefted: false,
      },
    });
    const member = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
        lefted: false,
      },
    });
    if (!admin || !member)
      return {
        message: "Can't find a room chat !",
        Object: null,
      };
    if (admin.user_role === 'MEMBER')
      return {
        message: "You can't ban any member !",
        Object: null,
      };
    if (member.user_role === 'OWNER')
      return {
        message: "You can't ban the owner !",
        Object: null,
      };
    if (member.member_status === 'MUTED')
      return {
        message: "You can't ban a muted member !",
        Object: null,
      };
    if (member.name === admin.name)
      return {
        message: "You can't ban yourself !",
        Object: null,
      };
      const check = await this.prisma.room_Chat.findFirst({
        where: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
          lefted: false,
        },
      });
      if (!check)
      return {
        message: "Can't find a room chat !",
        Object: null,
      };
    const result = await this.prisma.room_Chat.update({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
        lefted: false,
      },
      data: {
        member_status: 'BANNED',
      },
    });
    const channelUpdated = await this.prisma.channel.update({
      where: {
        id_channel: id_channel,
      },
      include: {
        users: true,
        bannedUsers: true,
      },
      data: {
        users: { disconnect: { id_user: member.id_user } },
        bannedUsers: { connect: { id_user: member.id_user } },
      },
    });
    if (!result || !channelUpdated)
      return {
        message: "Can't update a room chat / channel !",
        Object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      Object: result,
    };
  }

  //UNBAN MEMBER
  async unbanMember(id_user: string, id_friend: string, id_channel: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
      include: { users: true, bannedUsers: true },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_friend,
      },
    });
    if (!user)
      return {
        message: 'No such user !',
        Object: null,
      };
    if (!channel)
      return {
        message: 'No such channel !',
        Object: null,
      };
    const isAdmin = channel.users.some((user) => {
      return user.id_user === id_user;
    });
    const isBanned = channel.bannedUsers.some((user) => {
      return user.id_user === id_friend;
    });
    if (!isAdmin || !isBanned)
      return {
        message: 'The user is not a member in this Channel !',
        Object: null,
      };
    const admin = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: id_user,
        },
        lefted: false,
      },
    });
    const member = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
        lefted: false,
      },
    });
    if (!admin || !member)
      return {
        message: "Can't find a room chat !",
        Object: null,
      };
    if (admin.user_role === 'MEMBER')
      return {
        message: "You can't unban any member !",
        Object: null,
      };
    if (member.member_status !== 'BANNED')
      return {
        message: "The user isn't banned !",
        Object: null,
      };
    if (member.name === admin.name)
      return {
        message: "You can't unban yourself !",
        Object: null,
      };
    const messages = await this.prisma.message.deleteMany({
      where: {
        name_room: member.name,
      },
    });
    if (!messages)
      return {
        message: "Can't update a room chat / channel !",
        Object: null,
      };
    const result = await this.prisma.room_Chat.delete({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
      },
    });
    const channelUpdated = await this.prisma.channel.update({
      where: {
        id_channel: id_channel,
      },
      include: {
        users: true,
        bannedUsers: true,
      },
      data: {
        bannedUsers: { disconnect: { id_user: member.id_user } },
      },
    });
    if (!result || !channelUpdated)
      return {
        message: "Can't update a room chat / channel !",
        Object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      Object: result,
    };
  }

  //MUTE MEMBER
  async muteMember(
    id_user: string,
    id_friend: string,
    id_channel: string,
    muteTime: number,
  ) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
      include: { users: true },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_friend,
      },
    });
    if (!user)
      return {
        message: 'No such user !',
        Object: null,
      };
    if (!channel)
      return {
        message: 'No such channel !',
        Object: null,
      };
    const isAdmin = channel.users.some((user) => {
      return user.id_user === id_user;
    });
    const isMember = channel.users.some((user) => {
      return user.id_user === id_friend;
    });
    if (!isAdmin || !isMember)
      return {
        message: 'The user is not a member in this Channel !',
        Object: null,
      };
    const admin = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: id_user,
        },
        lefted: false,
      },
    });
    const member = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
        lefted: false,
      },
    });
    if (!admin || !member)
      return {
        message: "Can't find a room chat !",
        Object: null,
      };
    if (admin.user_role === 'MEMBER')
      return {
        message: "You can't Mute any member !",
        Object: null,
      };
    if (member.member_status === 'MUTED')
      return {
        message: 'The user is muted !',
        Object: null,
      };
    if (member.member_status === 'BANNED')
      return {
        message: 'The user is banned !',
        Object: null,
      };
    if (member.name === admin.name)
      return {
        message: "You can't mute yourself !",
        Object: null,
      };
    if (muteTime < 1 || muteTime > 1000000000)
      return {
        message: "You can't mute a member too much !",
        Object: null,
      };
      const check = await this.prisma.room_Chat.findFirst({
        where: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
          lefted: false,
        },
      });
      if (!check)
      return {
        message: "Can't find a room chat !",
        Object: null,
      };
    const result = await this.prisma.room_Chat.update({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
        lefted: false,
      },
      data: {
        member_status: 'MUTED',
        time_muted: new Date(),
      },
    });
    setTimeout(async () => {
      const channel = await this.prisma.room_Chat.findUnique({
        where: {
          id_channel_id_user: {  id_channel: id_channel,
            id_user: user.id_user,},
          member_status:'MUTED',
        },
      });
      if (channel) {
        await this.prisma.room_Chat.update({
          where: {
            id_channel_id_user: {
              id_channel: channel.id_channel,
              id_user: user.id_user,
            },
            member_status:'MUTED',
          },
          data: {
            member_status: 'NONE',
          },
        });
      }
    }, muteTime);
    if (!result)
      return {
        message: "Can't update a room chat !",
        Object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      Object: result,
    };
  }

  //UNMUTE MEMBER
  async unmuteMember(id_user: string, id_friend: string, id_channel: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
      include: { users: true },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_friend,
      },
    });
    if (!user)
      return {
        message: 'No such user !',
        Object: null,
      };
    if (!channel)
      return {
        message: 'No such channel !',
        Object: null,
      };
    const isAdmin = channel.users.some((user) => {
      return user.id_user === id_user;
    });
    const isMember = channel.users.some((user) => {
      return user.id_user === id_friend;
    });
    if (!isAdmin || !isMember)
      return {
        message: 'The user is not a member in this Channel !',
        Object: null,
      };
    const admin = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: id_user,
        },
        lefted: false,
      },
    });
    const member = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
        lefted: false,
      },
    });
    if (!admin || !member)
      return {
        message: "Can't find a room chat !",
        Object: null,
      };
    if (admin.user_role === 'MEMBER')
      return {
        message: "You can't Unmute any member ",
        Object: null,
      };
    if (member.member_status !== 'MUTED')
      return {
        message: "The user isn't muted !",
        Object: null,
      };
    if (member.name === admin.name)
      return {
        message: "You can't unmute yourself !",
        Object: null,
      };
      const check = await this.prisma.room_Chat.findFirst({
        where: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
          lefted: false,
        },
      });
      if (!check)
      return {
        message: "Can't find a room chat !",
        Object: null,
      };
    const result = await this.prisma.room_Chat.update({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
        lefted: false,
      },
      data: {
        member_status: 'NONE',
        time_muted: null,
      },
    });
    if (!result)
      return {
        message: "Can't update a room chat !",
        Object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      Object: result,
    };
  }
}
