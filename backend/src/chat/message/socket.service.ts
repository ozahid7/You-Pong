import { Injectable, OnModuleInit, Req, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PrismaService } from 'src/prisma/prisma.service';
import { Server, Socket } from 'socket.io';
import { AuthGuard } from '@nestjs/passport';
import { disconnect } from 'process';
import { JsonObject } from '@prisma/client/runtime/library';
import { time } from 'console';
import { use } from 'passport';

export interface infoType {
  id_channel: string;
  id_sender: string;
  message: string;
}

@Injectable()
@WebSocketGateway({ namespace: '/chat' })
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private prisma: PrismaService) {}
  private users: { id_user: string; id_socket: string }[] = [];
  private infos: infoType;
  async addUser(id_user: string, id_socket: string) {
    await this.users.push({ id_user, id_socket });
  }
  removeUser(id_socket: string) {
    this.users = this.users.filter((user) => user.id_socket !== id_socket);
  }
  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    const id_user = socket.handshake.headers['id_user'].toString();
    console.log('connected: ', socket.id);
    // console.log('id_user: ', id_user);
    if (
      !this.users.find(
        (user) => user.id_user === id_user && user.id_socket === socket.id,
      )
    ) {
      this.addUser(id_user, socket.id);
    }
    console.log(this.users);
    // socket.on('receiveMessage', this.receiveMessage);
  }
  handleDisconnect(socket: Socket) {
    this.removeUser(socket.id);
    console.log('disconnected: ', socket.id);
    console.log(this.users);
  }

  @SubscribeMessage('newMessage')
  async newMessage(
    @MessageBody() info: infoType,
    @ConnectedSocket() socket: Socket,
  ) {
    const sender = this.users.find((user) => user.id_socket === socket.id);
    const receiver = this.users.find((user) => user.id_user === info.id_sender);
    const bannedUser = [];
    if (receiver !== undefined && sender !== undefined) {
      const channel = await this.prisma.channel.findUnique({
        where: {
          id_channel: info.id_channel,
        },
        include: { users: true },
      });
      const room = await this.prisma.room_Chat.findUnique({
        where: {
          id_channel_id_user: {
            id_channel: info.id_channel,
            id_user: info.id_sender,
          },
        },
        include: {
          blocked_users: true,
        },
      });
      let bannedUserd = channel.users.forEach(async (user) => {
        const room = await this.prisma.room_Chat.findUnique({
          where: {
            id_channel_id_user: {
              id_channel: info.id_channel,
              id_user: user.id_user,
            },
          },
          include: { blocked_users: true },
        });
        if (
          room &&
          (room.member_status === 'BANNED' ||
            room.lefted ||
            room.blocked_users[info.id_sender])
        )
          bannedUser.push(user.id_user);
      });
      if (room && room.member_status !== 'BANNED' && !room.lefted) {
        console.log(room.name);

        // const message = await this.prisma.message.create({
        //   data: {
        //     content: info.message,
        //     id_sender: sender.id_user,
        //     // name_room: room.name,
        //     id_channel: info.id_channel,
        //   },
        // });
        // let users = this.users.filter(
        //   (user) =>
        //     channel.users.some(
        //       (userChan) =>
        //         user.id_user === userChan.id_user &&
        //         user.id_user !== sender.id_user,
        //     ) &&
        //     !bannedUser.some((userBlock) => user.id_user === userBlock.id_user),
        // );
        // if (message) {
        //   console.log('send message');
        //   info.id_sender = sender.id_user;
        //   users.map((user) => {
        //     this.server.to(user.id_socket).emit('receiveMessage', info);
        //   });
        }
      }
    }
  }
  // @SubscribeMessage('receiveMessage')
//   async receiveMessage(socket: Socket, info: infoType) {
//     const user = this.users.filter((user) => user.id_socket === socket.id);
//     console.log('user => ', user);
//     console.log('info => ', info);
//   }
// }
