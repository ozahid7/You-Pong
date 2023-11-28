import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { channelDto } from '../dto/channel.create.dto';
import { Channel } from '@prisma/client';
import { join } from 'path';

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  //GET MANY
  async getChannels() {
    const result = await this.prisma.channel.findMany();
    if (!result) return 'There is no channels !';
    return result;
  }

  //GET
  async getChannel(name: string) {
    const result = await this.prisma.channel.findUnique({
      where: {
        name: name,
      },
    });
    if (!result) return 'No such channel !';
    return result;
  }

  // //POST MANY
  // async postChannels(channels: channelDto[]) {
  //   const data = channels.map((channel) => ({
  //     // let mappedData = {
  //     name: channel.name,
  //     description: channel.description,
  //     avatar: channel.avatar,
  //     hash: channel.hash,
  //     type: channel.type,
  //     created_at: channel.created_at,
  //     updated_at: channel.updated_at,
  //     users: channel.users,
  //     rooms: channel.rooms,
  //     // }
  //     // if (mappedData.type === 'PROTECTED' && !mappedData.hash)
  //     // {
  //     // }
  //   }));
  //   const result = await this.prisma.channel.createMany({
  //     data,
  //     skipDuplicates: true,
  //   });
  //   const duplicate = (data.length = result.count);
  //   if (duplicate > 0)
  //     return {
  //       message: 'Duplicates found',
  //       count: duplicate,
  //     };
  //   return { message: 'Channels created successfully' };
  // }

  //POST
  async postChannel(channel: channelDto, id_user: string) {
    if (!channel) return 'empty';
    const duplicate = await this.prisma.channel.findUnique({
      where: {
        name: channel.name,
      },
    });
    if (duplicate)
      return {
        message: 'duplicate found',
      };
    if (channel.type === 'PROTECTED' && !channel.hash)
      return 'Password Obligatoire !';
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_user,
      },
    });
    if (!user) console.log('user not found !');

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
      },
    });
    if (!room) console.log("Can't create a room chat !");
    return result;
  }

  //DELETE MANY
  async deleteChannels() {
    const result = await this.prisma.channel.deleteMany();
    return result;
  }

  //DELETE
  async deleteChannel(name: string) {
    if (!name) return 'No name';
    const result = await this.prisma.channel.delete({
      where: {
        name: name,
      },
    });
    if (!result) return 'No channel to delete !';
    return result;
  }

  //PUT
  async putchannel(name: string, channel: Channel) {
    const chan_name = await this.prisma.channel.findUnique({
      where: {
        name: name,
      },
    });
    if (!channel || !name || !chan_name) return 'No channel to set';
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
    if (channel.name !== undefined) {
      const dup_name = await this.prisma.channel.findUnique({
        where: {
          name: channel.name,
        },
      });
      if (dup_name) return 'Name already in use !';
      updated.name = channel.name;
    }
    if (channel.description !== undefined)
      updated.description = channel.description;
    if (channel.avatar !== undefined) updated.avatar = channel.avatar;
    if (channel.hash !== undefined) updated.hash = channel.hash;
    if (channel.type !== undefined) {
      if (
        channel.type === 'PROTECTED' &&
        (!channel.hash || channel.hash === undefined)
      )
        return 'Password Obligatoire !';
      updated.type = channel.type;
    }
    if (updated.name) {
      const duplicate = await this.prisma.channel.findUnique({
        where: {
          name: updated.name,
        },
      });
      if (duplicate) return 'channel name already in use !';
    }
    const result = await this.prisma.channel.update({
      where: {
        name: name,
      },
      data: updated,
    });
    return result;
  }

  //JOIN CHANNEL
  async joinChannel(id_user: string, name: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        name: name,
      },
      include: { users: true },
    });
    if (!channel) return 'No such Channel !';
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_user,
      },
    });
    if (!user) return 'No such User !';
    const joined = channel.users.some((user) => {
      return user.id_user === id_user;
    });
    if (joined) return 'Already joined !';
    const result = await this.prisma.channel.update({
      where: {
        name: name,
      },
      data: {
        users: {
          connect: { id_user: id_user },
        },
      },
    });
    const room = await this.prisma.room_Chat.create({
      data: {
        id_channel: result.id_channel,
        id_user: id_user,
        user_role: 'MEMBER',
      },
    });
    if (!room) console.log("Can't create a room chat !");
    return result;
  }

  //leave channel
  async leaveChannel(id_user: string, name: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        name: name,
      },
      include: { users: true },
    });
    if (!channel) return 'No such Channel !';
    const joined = channel.users.some((user) => {
      return user.id_user === id_user;
    });
    if (!joined) return 'The user is not a member in this Channel !';
    const result = await this.prisma.channel.update({
      where: {
        name: name,
      },
      data: {
        users: {
          disconnect: { id_user: id_user },
        },
      },
    });
    const room = await this.prisma.room_Chat.delete({
      where: {
        id_channel_id_user: {
          id_channel: result.id_channel,
          id_user: id_user,
        },
      },
    });
    if (!room) console.log("Can't delete a room chat !");
    return result;
  }

  //kick User
  async kickUser(id_user: string, username: string, name: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        name: name,
      },
      include: { users: true },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) return 'No such username !';
    if (!channel) return 'No such channel !';
    const iskicker = channel.users.some((user) => {
      return user.id_user === id_user;
    });
    const iskicked = channel.users.some((user) => {
      return user.username === username;
    });
    if (!iskicker || !iskicked)
      return 'The user is not a member in this Channel !';
    const kicker = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: id_user,
        },
      },
    });
    const kicked = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
      },
    });
    if (kicked.user_role === 'OWNER') return "You can't kick the owner !";
    if (kicker.user_role === 'MEMBER') return "You can't kick !";
    if (kicked.user_role === 'ADMIN' && kicker.user_role !== 'OWNER')
      return "You can't kick the admin !";
    const result = await this.prisma.channel.update({
      where: {
        name: name,
      },
      data: {
        users: {
          disconnect: { id_user: user.id_user },
        },
      },
    });
    const room = await this.prisma.room_Chat.delete({
      where: {
        id_channel_id_user: {
          id_channel: result.id_channel,
          id_user: user.id_user,
        },
      },
    });
    if (!room) console.log("Can't delete a room chat !");
    return result;
  }

  //SET ADMIN
  async setAdmin(id_user: string, username: string, name: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        name: name,
      },
      include: { users: true },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) return 'No such username !';
    if (!channel) return 'No such channel !';
    const isOwner = channel.users.some((user) => {
      return user.id_user === id_user;
    });
    const isMember = channel.users.some((user) => {
      return user.username === username;
    });
    if (!isOwner || !isMember)
      return 'The user is not a member in this Channel !';
    const owner = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: id_user,
        },
      },
    });
    const member = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
      },
    });
    if (owner.user_role === 'MEMBER')
      return "You can't set a member as admin !";
    if (member.user_role !== 'MEMBER') return 'the user is an admin !';
    const result = await this.prisma.room_Chat.update({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
      },
      data: {
        user_role: 'ADMIN',
      },
    });
    if (!result) console.log("Can't update a room chat !");
    return result;
  }

  //SET MEMBER
  async setMember(id_user: string, username: string, name: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        name: name,
      },
      include: { users: true },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) return 'No such username !';
    if (!channel) return 'No such channel !';
    const isOwner = channel.users.some((user) => {
      return user.id_user === id_user;
    });
    const idAdmin = channel.users.some((user) => {
      return user.username === username;
    });
    if (!isOwner || !idAdmin)
      return 'The user is not a member in this Channel !';
    const owner = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: id_user,
        },
      },
    });
    const admin = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
      },
    });
    if (owner.user_role !== 'OWNER') return "You can't set a admin as member !";
    if (admin.user_role === 'OWNER') return 'You are the owner !';
    if (admin.user_role !== 'ADMIN') return 'the user is a member !';
    const result = await this.prisma.room_Chat.update({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
      },
      data: {
        user_role: 'MEMBER',
      },
    });
    if (!result) console.log("Can't update a room chat !");
    return result;
  }

  //BAN MEMBER
  async banMember(id_user: string, username: string, name: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        name: name,
      },
      include: { users: true },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) return 'No such username !';
    if (!channel) return 'No such channel !';
    const isAdmin = channel.users.some((user) => {
      return user.id_user === id_user;
    });
    const isMember = channel.users.some((user) => {
      return user.username === username;
    });
    if (!isAdmin || !isMember)
      return 'The user is not a member in this Channel !';
    const admin = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: id_user,
        },
      },
    });
    const member = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
      },
    });
    if (admin.user_role === 'MEMBER') return "You can't ban any member !";
    if (member.user_role === 'OWNER') return 'You are the owner !';
    const result = await this.prisma.room_Chat.update({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
      },
      data: {
        member_status: 'BANNED',
      },
    });
    if (!result) console.log("Can't update a room chat !");
    return result;
  }

  //UNBAN MEMBER
  async unbanMember(id_user: string, username: string, name: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        name: name,
      },
      include: { users: true },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) return 'No such username !';
    if (!channel) return 'No such channel !';
    const isAdmin = channel.users.some((user) => {
      return user.id_user === id_user;
    });
    const isMember = channel.users.some((user) => {
      return user.username === username;
    });
    if (!isAdmin || !isMember)
      return 'The user is not a member in this Channel !';
    const admin = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: id_user,
        },
      },
    });
    const member = await this.prisma.room_Chat.findUnique({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
      },
    });
    if (admin.user_role === 'MEMBER') return "You can't unban any member !";
    if (member.member_status !== 'BANNED') return "The user isn't banned !";
    const result = await this.prisma.room_Chat.update({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
      },
      data: {
        member_status: 'NONE',
      },
    });
    if (!result) console.log("Can't update a room chat !");
    return result;
  }
}
