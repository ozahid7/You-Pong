import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  //POST
  async postRoom(username: string, room_name: string, id_channel: string) {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
    });
    if (!channel || !user) return 'user or channel unknown !';

    const result = await this.prisma.room_Chat.create({
      data: {
        name: room_name,
        id_user: user.id_user,
        id_channel: channel.id_channel,
        lefted: false,
      },
    });
    return result;
  }

  //DELETE CHANNEL MANY
  async deleteChannelRooms(id_channel: string) {
    const result = await this.prisma.room_Chat.deleteMany({
      where: {
        id_channel: id_channel,
      },
    });
    return result;
  }
  //DELETE MANY
  async deleteRooms() {
    const result = await this.prisma.room_Chat.deleteMany();
    return result;
  }

  //DELETE
  async deleteRoom(name: string) {
    const result = await this.prisma.room_Chat.delete({
      where: {
        name: name,
      },
    });
    return result;
  }

  //GET
  async getRoom(name: string) {
    const result = await this.prisma.room_Chat.findUnique({
      where: {
        name: name,
      },
    });
    return result;
  }

  //GET MANY
  async getRooms() {
    const result = await this.prisma.room_Chat.findMany();
    return result;
  }

  //PUT LEFT
  async putRoom(name: string) {
    const result = await this.prisma.room_Chat.update({
      where: {
        name: name,
      },
      data: {
        lefted: true,
      },
    });
    return result;
  }
  //PUT JOIN
  // async putRoom_join(name: string) {
  //   const result = await this.prisma.room_Chat.update({
  //     where: {
  //       name: name,
  //     },
  //     data: {
  //       lefted: false,
  //     },
  //   });
  //   return result;
  // }
}
