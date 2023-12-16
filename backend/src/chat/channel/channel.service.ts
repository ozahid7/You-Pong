import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { channelDto } from '../dto/channel.create.dto';
import { Channel } from '@prisma/client';

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
        NOT: { member_status: 'BANNED' },
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
          return { user, user_role: room.user_role };
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
    return {
      message: 'Channel Updated Succefully',
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
  async postChannelDirect(id_user: string, username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_user,
      },
    });
    const freind = await this.prisma.user.findUnique({
      where: {
        username: username,
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
  async deleteChannelDirect(id_user: string, username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_user,
      },
    });
    const freind = await this.prisma.user.findUnique({
      where: {
        username: username,
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
      data: {
        users: {
          disconnect: { id_user: id_user },
        },
        rooms: {
          disconnect: {
            id_channel_id_user: { id_channel: id_channel, id_user: id_user },
          },
        },
      },
      include: { users: true, rooms: true },
    });

    const room = await this.prisma.room_Chat.update({
      where: {
        id_channel_id_user: {
          id_channel: result.id_channel,
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
    if (result.users.length === 0 && result.rooms.length === 0) {
      const channel = this.deleteChannel(result.id_channel);
      if (!(await channel).object)
        return {
          message: "Can't delete a channel !",
          object: null,
        };
    }
    return {
      message: 'Channel Updated Succefully',
      object: result,
    };
  }

  //kick User
  async kickUser(id_user: string, username: string, id_channel: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
      include: { users: true },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user)
      return {
        message: 'No such username !',
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
      return user.username === username;
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
      data: {
        users: {
          disconnect: { id_user: user.id_user },
        },
        rooms: {
          disconnect: {
            id_channel_id_user: {
              id_channel: id_channel,
              id_user: user.id_user,
            },
          },
        },
      },
    });
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
  async setAdmin(id_user: string, username: string, id_channel: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
      include: { users: true },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user)
      return {
        message: 'No such username !',
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
      return user.username === username;
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
  async setMember(id_user: string, username: string, id_channel: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
      include: { users: true },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user)
      return {
        message: 'No such username !',
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
      return user.username === username;
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
  async banMember(id_user: string, username: string, id_channel: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
      include: { users: true },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user)
      return {
        message: 'No such username !',
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
      return user.username === username;
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
        lefted: true,
        lefted_at: new Date(),
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
  async unbanMember(id_user: string, username: string, id_channel: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
      include: { users: true },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user)
      return {
        message: 'No such username !',
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
      return user.username === username;
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
    const result = await this.prisma.room_Chat.update({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
      },
      data: {
        member_status: 'NONE',
        lefted: true,
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
    username: string,
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
        username: username,
      },
    });
    if (!user)
      return {
        message: 'No such username !',
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
      return user.username === username;
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
  async unmuteMember(id_user: string, username: string, id_channel: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
      include: { users: true },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user)
      return {
        message: 'No such username !',
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
      return user.username === username;
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
