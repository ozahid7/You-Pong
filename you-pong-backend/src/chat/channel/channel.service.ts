import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { channelDto } from '../dto/channel.create.dto';

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  //GET MANY
  async getChannels() {
    const result = await this.prisma.channel.findMany();
    return result;
  }

  //GET
  async getChannel(name: string) {
    const result = await this.prisma.channel.findUnique({
      where: {
        name: name,
      },
    });
    return result;
  }

  //POST MANY
  async postChannels(channels: channelDto[]) {
    const data = channels.map((channel) => ({
      name: channel.name,
      description: channel.description,
      avatar: channel.avatar,
      hash: channel.hash,
      type: channel.type,
      created_at: channel.created_at,
      updated_at: channel.updated_at,
      users: channel.users,
      rooms: channel.rooms,
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
    const duplicate = await this.prisma.channel.findUnique({
      where: {
        name: channel.name,
      },
    });
    if (duplicate)
      return {
        message: 'duplicate found',
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
        // users: channel.users,
        // rooms: channel.rooms,
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
    const result = await this.prisma.channel.delete({
      where: {
        name: name,
      },
    });
    return result;
  }

  //   //PUT MANY
  //   async putchannels() {
  //     const result = this.prisma.channel.updateMany();
  //     return result;
  //   }

  //   //PUT
  //   async putchannel() {
  //     const result = this.prisma.channel.update();
  //     return result;
  //   }
}
