import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  // GET MANY
  async getMessages(id_channel: string, id_user: string) {
    const me = await this.prisma.user.findUnique({
      where: {
        id_user: id_user,
      },
      include: { blocked_from: true, blocked_user: true, bannedChannels: true },
    });
    if (!me)
      return {
        message: 'No such user !',
        Object: null,
      };
    const channel = await this.prisma.channel.findUnique({
      where: {
        id_channel: id_channel,
      },
      include: { users: true, bannedUsers: true },
    });
    if (!channel)
      return {
        message: 'No such channel !',
        Object: null,
      };
    if (
      channel.bannedUsers.find((user) => user.id_user === id_user) ||
      channel.users.find((user) => user.id_user === id_user) === undefined
    ) {
      return {
        message: 'Your not a member in this channel !',
        Object: null,
      };
    }
    if (channel) {
      const messages = await this.prisma.message.findMany({
        where: { id_channel: channel.id_channel },
        orderBy: {
          created_at: 'asc',
        },
        include: { user: true },
      });
      const users = await Promise.all(
        channel.users.map(async (user) => {
          if (
            me.blocked_from.find((block) => user.id_user === block.id_user) ===
              undefined &&
            me.blocked_user.find((block) => user.id_user === block.id_user) ===
              undefined
          ) {
            return user;
          }
        }),
      );
      const filtredUsers = await Promise.all(users.filter((user) => user));
      const messagesFiltered = await Promise.all(
        messages.map(async (message) => {
          if (
            filtredUsers.find(
              (user) => user && user.id_user === message.id_sender,
            )
          )
            return {
              id_message: message.id_message,
              content: message.content,
              created_at: message.created_at,
              id_sender: message.id_sender,
              name_room: message.name_room,
              id_channel: message.id_channel,
              user: message.user,
            };
        }),
      );
      const result = await Promise.all(
        messagesFiltered.filter((message) => message),
      );
      if (result.length !== 0)
        return {
          message: 'Messages founded successfully',
          Object: result,
        };
      return {
        message: 'No Messages to display !',
        Object: result,
      };
    }
    return {
      message: 'No such channel !',
      Object: null,
    };
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

  //DELETE CHANNEL MANY
  async deleteChannelMessages(id_channel: string) {
    const result = await this.prisma.message.deleteMany({
      where: {
        id_channel: id_channel,
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
  // async postMessages(name: string, messages: messageDto[], id_user: string) {
  //   const data = messages.map((message) => ({
  //     content: message.content,
  //     name: name,
  //     id_sender: id_user,
  //   }));
  //   if (!data) return 'no data to add !';
  //   const result = await this.prisma.message.createMany({
  //     data,
  //     skipDuplicates: true,
  //   });
  //   return result;
  // }

  //POST
  // async postMessage(name: string, message: messageDto, id_user: string) {
  //   const result = await this.prisma.message.create({
  //     data: {
  //       content: message.content,
  //       name: name,
  //       id_sender: id_user,
  //     },
  //   });
  //   return result;
  // }
}
