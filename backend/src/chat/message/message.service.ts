import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { messageDto } from '../dto/message.create.dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  //GET MANY
  async getMessages(name: string) {
    const result = await this.prisma.message.findMany({
      where: {
        name: name,
      },
    });
    return result;
  }

  //GET
  async getMessage(id_message: string) {
    const result = await this.prisma.message.findUnique({
      where: {
        id_message: id_message,
      },
    });
    return result;
  }

  //DELETE MANY
  async deleteMessages() {
    const result = await this.prisma.message.deleteMany();
    return result;
  }

  //DELETE
  async deleteMessage(id_message: string) {
    const result = await this.prisma.message.delete({
      where: {
        id_message: id_message,
      },
    });
    return result;
  }

  //POST MANY
  async postMessages(name: string, messages: messageDto[], id_user: string) {
    const data = messages.map((message) => ({
      content: message.content,
      name: name,
      id_sender: id_user,
    }));
    if (!data) return 'no data to add !';
    const result = await this.prisma.message.createMany({
      data,
      skipDuplicates: true,
    });
    return result;
  }

  //POST
  async postMessage(name: string, message: messageDto, id_user: string) {
    const result = await this.prisma.message.create({
      data: {
        content: message.content,
        name: name,
        id_sender: id_user,
      },
    });
    return result;
  }
}
