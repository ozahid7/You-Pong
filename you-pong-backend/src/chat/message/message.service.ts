import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { messageDto } from '../dto/message.create.dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  //GET MANY
  async getMessages() {
    const result = this.prisma.message.findMany();
    return result;
  }

  //GET
  async getMessage(message: messageDto) {
    const result = this.prisma.message.findUnique({
      where: {
        id_message: message.id_message,
      },
    });
    return result;
  }

  //DELETE MANY
  async deleteMessages() {
    const result = this.prisma.message.deleteMany();
    return result;
  }
}
