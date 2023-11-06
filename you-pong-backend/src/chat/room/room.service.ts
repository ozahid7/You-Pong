import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  //POST
  async postRoom(username: string, name: string) {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    const channel = await this.prisma.channel.findUnique({
      where: {
        name: name,
      },
    });
    if (!channel || !user) return 'user or channel unknown !';

    const result = await this.prisma.room_Chat.create({
      data: {
        id_user: user.id_user,
        id_channel: channel.id_channel,
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
  async deleteRoom(id_room: string) {
    const result = await this.prisma.room_Chat.delete({
      where: {
        id_room: id_room,
      },
    });
    return result;
  }

  //GET
  async getRoom(id_room: string) {
    const result = await this.prisma.room_Chat.findUnique({
      where: {
        id_room: id_room,
      },
    });
    return result;
  }

  //GET MANY
  async getRooms() {
    const result = await this.prisma.room_Chat.findMany();
    return result;
  }
}
