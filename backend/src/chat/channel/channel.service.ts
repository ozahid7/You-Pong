import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { channelDto } from '../dto/channel.create.dto';
import { Channel } from '@prisma/client';

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  //GET MANY
  async getChannels(id_user: string) {
    const channels = await this.prisma.channel.findMany({
      include: {
        users: true,
      },
    });
    if (!channels)
      return {
        message: 'There is no channels !',
        object: null,
      };
    const result = channels.filter(
      (channel) => !channel.users.find((user) => user.id_user === id_user),
    );
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

  //GET
  async getChannel(name: string) {
    const result = await this.prisma.channel.findUnique({
      where: {
        name: name,
      },
      include: {
        users: true,
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
  //       object: null,
  //     };
  //   return { message: 'Channels created successfully' };
  // }

  //DELETE MANY
  async deleteChannels() {
    const result = await this.prisma.channel.deleteMany();
    return {
      message: 'Channels Deleted Succesfully',
      object: result,
    };
  }

  //DELETE
  async deleteChannel(name: string) {
    if (!name)
      return {
        message: 'No such channel !',
        object: null,
      };
    const result = await this.prisma.channel.delete({
      where: {
        name: name,
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

  // //PUT MANY
  // async putchannels() {
  //   const result = this.prisma.channel.updateMany({

  //   });
  //   return result;
  // }

  //PUT
  async putchannel(name: string, channel: Channel) {
    const chan_name = await this.prisma.channel.findUnique({
      where: {
        name: name,
      },
    });
    if (!channel || !name || !chan_name)
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
    if (channel.name !== undefined) {
      const dup_name = await this.prisma.channel.findUnique({
        where: {
          name: channel.name,
        },
      });
      if (dup_name)
        return {
          message: 'Name already in use !',
          object: null,
        };
      updated.name = channel.name;
    }
    if (channel.description != undefined)
      updated.description = channel.description;
    if (channel.avatar != undefined) updated.avatar = channel.avatar;
    if (channel.hash != undefined) updated.hash = channel.hash;
    if (channel.type != undefined) {
      if (channel.type === 'PROTECTED' && !channel.hash)
        return {
          message: 'Password Obligatoire !',
          object: null,
        };
      updated.type = channel.type;
    }
    if (updated.name) {
      const duplicate = await this.prisma.channel.findUnique({
        where: {
          name: updated.name,
        },
      });
      if (duplicate)
        return {
          message: 'Channel name already in use !',
          object: null,
        };
    }

    const result = await this.prisma.channel.update({
      where: {
        name: name,
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
    const duplicate = await this.prisma.channel.findUnique({
      where: {
        name: channel.name,
      },
    });
    if (duplicate)
      return {
        message: 'Duplicate Found',
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

  //JOIN CHANNEL
  async joinChannel(id_user: string, name: string, password: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        name: name,
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
    if (joined) return 'Already joined !';
    if (channel.type === 'PROTECTED') {
      if (channel.hash !== password)
        return {
          message: 'Password Incorrect',
          object: null,
        };
    }
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
    if (!room)
      return {
        message: "Can't create a room chat !",
        object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      object: result,
    };
  }

  //leave channel
  async leaveChannel(id_user: string, name: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        name: name,
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
    if (!room)
      return {
        message: "Can't delete a room chat !",
        object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      object: result,
    };
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
    if (!room)
      return {
        message: "Can't delete a room chat !",
        object: null,
      };
    return {
      message: 'Channel Updated Succefully',
      object: result,
    };
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
      return {
        message: "You can't set a member as admin !",
        object: null,
      };
    if (member.user_role !== 'MEMBER')
      return {
        message: 'The user is an admin !',
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
    if (admin.user_role === 'MEMBER')
      return {
        message: "You can't ban any member !",
        object: null,
      };
    if (member.user_role === 'OWNER')
      return {
        message: 'You are the owner !',
        object: null,
      };
    if (member.member_status === 'MUTED')
      return {
        message: 'The user is muted !',
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
        member_status: 'BANNED',
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

  //MUTE MEMBER
  async muteMember(
    id_user: string,
    username: string,
    name: string,
    muteTime: number,
  ) {
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
    const result = await this.prisma.room_Chat.update({
      where: {
        id_channel_id_user: {
          id_channel: channel.id_channel,
          id_user: user.id_user,
        },
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

  async unmuteMember(id_user: string, username: string, name: string) {
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
