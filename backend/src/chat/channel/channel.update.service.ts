import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Channel } from '@prisma/client';
import { ChannelService } from './channel.service';

@Injectable()
export class ChannelUpdateService {
  constructor(
    private prisma: PrismaService,
    private channelService: ChannelService,
  ) {}

  //PUT
  async putchannel(id_channel: string, channel: Channel) {
    const chan_name = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
    });
    if (!channel || !id_channel || !chan_name)
      return {
        message: 'No channel to set',
        object: null,
      };
    let updated: Channel = {
      id_channel: channel.id_channel,
      name: channel.name,
      description: channel.description,
      avatar: channel.avatar,
      hash: channel.hash,
      type: channel.type,
      created_at: channel.created_at,
      updated_at: channel.updated_at,
    };
    if (channel.name !== undefined) updated.name = channel.name;
    if (channel.description != undefined)
      updated.description = channel.description;
    if (channel.avatar != undefined) updated.avatar = channel.avatar;
    if (channel.hash != undefined) updated.hash = channel.hash;
    if (channel.type != undefined) {
      if (
        channel.type === 'PROTECTED' &&
        (!channel.hash || channel.hash !== chan_name.hash)
      )
        return {
          message: 'Password Obligatoire !',
          object: null,
        };
      updated.type = channel.type;
    }
    const result = await this.prisma.channel.update({
      where: {
        id_channel: id_channel,
      },
      data: updated,
    });
    if (!result)
      return {
        message: "Can't update Channel !",
        object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      object: result,
    };
  }

  //JOIN CHANNEL
  async joinChannel(id_user: string, id_channel: string, password: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
      include: { users: true },
    });
    if (!channel)
      return {
        message: 'No such Channel !',
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
    const joined = channel.users.some((user) => {
      return user.id_user === id_user;
    });
    if (joined)
      return {
        message: 'Already joined !',
        object: null,
      };
    if (channel.type === 'PROTECTED') {
      if (channel.hash !== password)
        return {
          message: 'Password Incorrect',
          object: null,
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
        object: null,
      };
    const result = await this.prisma.channel.update({
      where: {
        id_channel: id_channel,
      },
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
      object: result,
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
        object: null,
      };
    const joined = channel.users.some((user) => {
      return user.id_user === id_user;
    });
    if (!joined)
      return {
        message: 'The user is not a member in this Channel !',
        object: null,
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
        object: null,
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
        object: null,
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
        object: null,
      };
    if (result.users.length === 0) {
      const channel = await this.channelService.deleteChannel(
        result.id_channel,
      );
      if (!channel.object)
        return {
          message: "Can't delete a channel !",
          object: null,
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
      if (!newOwner)
        return {
          message: "Can't update a room chat !",
          object: null,
        };
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
          object: null,
        };
    }
    return {
      message: 'Channel Updated Succefully',
      object: result,
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
        object: null,
      };
    if (!channel)
      return {
        message: 'No such channel !',
        object: null,
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
        object: null,
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
        object: null,
      };
    if (kicked.user_role === 'OWNER')
      return {
        message: "You can't kick the owner !",
        object: null,
      };
    if (kicker.user_role === 'MEMBER')
      return {
        message: "You can't kick !",
        object: null,
      };
    if (kicked.user_role === 'ADMIN' && kicker.user_role !== 'OWNER')
      return {
        message: "You can't kick the admin !",
        object: null,
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
        object: null,
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
        object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      object: result,
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
        object: null,
      };
    if (!channel)
      return {
        message: 'No such channel !',
        object: null,
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
        object: null,
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
        object: null,
      };
    if (owner.user_role === 'MEMBER')
      return {
        message: "You can't set a member as admin !",
        object: null,
      };
    if (member.user_role !== 'MEMBER')
      return {
        message: 'The user is an admin !',
        object: null,
      };
    if (owner.name === member.name)
      return {
        message: "You can't set yourself as a admin !",
        object: null,
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
        object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      object: result,
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
        object: null,
      };
    if (!channel)
      return {
        message: 'No such channel !',
        object: null,
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
        object: null,
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
        object: null,
      };
    if (owner.user_role !== 'OWNER')
      return {
        message: "You can't set a admin as member !",
        object: null,
      };
    if (admin.user_role === 'OWNER')
      return {
        message: 'You are the owner !',
        object: null,
      };
    if (admin.user_role !== 'ADMIN')
      return {
        message: 'The user is a member !',
        object: null,
      };
    if (owner.name === admin.name)
      return {
        message: "You can't set yourself as a member!",
        object: null,
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
        object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      object: result,
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
        object: null,
      };
    if (!channel)
      return {
        message: 'No such channel !',
        object: null,
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
        object: null,
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
        object: null,
      };
    if (admin.user_role === 'MEMBER')
      return {
        message: "You can't ban any member !",
        object: null,
      };
    if (member.user_role === 'OWNER')
      return {
        message: "You can't ban the owner !",
        object: null,
      };
    if (member.member_status === 'MUTED')
      return {
        message: "You can't ban a muted member !",
        object: null,
      };
    if (member.name === admin.name)
      return {
        message: "You can't ban yourself !",
        object: null,
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
        object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      object: result,
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
        object: null,
      };
    if (!channel)
      return {
        message: 'No such channel !',
        object: null,
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
        object: null,
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
        object: null,
      };
    if (admin.user_role === 'MEMBER')
      return {
        message: "You can't unban any member !",
        object: null,
      };
    if (member.member_status !== 'BANNED')
      return {
        message: "The user isn't banned !",
        object: null,
      };
    if (member.name === admin.name)
      return {
        message: "You can't unban yourself !",
        object: null,
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
        object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      object: result,
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
        object: null,
      };
    if (!channel)
      return {
        message: 'No such channel !',
        object: null,
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
        object: null,
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
        object: null,
      };
    if (admin.user_role === 'MEMBER')
      return {
        message: "You can't Mute any member !",
        object: null,
      };
    if (member.member_status === 'MUTED')
      return {
        message: 'The user is muted !',
        object: null,
      };
    if (member.member_status === 'BANNED')
      return {
        message: 'The user is banned !',
        object: null,
      };
    if (member.name === admin.name)
      return {
        message: "You can't mute yourself !",
        object: null,
      };
    if (muteTime < 1 || muteTime > 1000000000)
      return {
        message: "You can't mute a member too much !",
        object: null,
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
      await this.prisma.room_Chat.update({
        where: {
          id_channel_id_user: {
            id_channel: channel.id_channel,
            id_user: user.id_user,
          },
          lefted: false,
        },
        data: {
          member_status: 'NONE',
        },
      });
    }, muteTime);
    if (!result)
      return {
        message: "Can't update a room chat !",
        object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      object: result,
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
        object: null,
      };
    if (!channel)
      return {
        message: 'No such channel !',
        object: null,
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
        object: null,
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
        object: null,
      };
    if (admin.user_role === 'MEMBER')
      return {
        message: "You can't Unmute any member ",
        object: null,
      };
    if (member.member_status !== 'MUTED')
      return {
        message: "The user isn't muted !",
        object: null,
      };
    if (member.name === admin.name)
      return {
        message: "You can't unmute yourself !",
        object: null,
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
        object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      object: result,
    };
  }
}
