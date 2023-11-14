import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { channelDto } from '../dto/channel.create.dto';
import { Channel } from '@prisma/client';
import { channel } from 'diagnostics_channel';
import { skip } from 'node:test';

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

  //POST MANY
  async postChannels(channels: channelDto[]) {
    const data = channels.map((channel) => ({
      // let mappedData = {
      name: channel.name,
      description: channel.description,
      avatar: channel.avatar,
      hash: channel.hash,
      type: channel.type,
      created_at: channel.created_at,
      updated_at: channel.updated_at,
      users: channel.users,
      rooms: channel.rooms,
      // }
      // if (mappedData.type === 'PROTECTED' && !mappedData.hash)
      // {
      // }
    }));
    const result = await this.prisma.channel.createMany({
      data,
      skipDuplicates: true,
    });
    const duplicate = (data.length = result.count);
    if (duplicate > 0)
      return {
        message: 'Duplicates found',
        count: duplicate,
      };
    return { message: 'Channels created successfully' };
  }

  //POST
  async postChannel(channel: channelDto) {
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
    const result = await this.prisma.channel.create({
      data: {
        name: channel.name,
        description: channel.description,
        avatar: channel.avatar,
        hash: channel.hash,
        type: channel.type,
        created_at: channel.created_at,
        updated_at: channel.updated_at,
      },
    });

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
    if (channel.description != undefined)
      updated.description = channel.description;
    if (channel.avatar != undefined) updated.avatar = channel.avatar;
    if (channel.hash != undefined) updated.hash = channel.hash;
    if (channel.type != undefined) {
      if (channel.type === 'PROTECTED' && !channel.hash)
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
}
