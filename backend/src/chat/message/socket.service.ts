import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PrismaService } from 'src/prisma/prisma.service';
import { Server, Socket } from 'socket.io';

export interface infoType {
  id_channel: string;
  id_sender: string;
  message: string;
  created_at: Date;
}

@Injectable()
@WebSocketGateway({ namespace: '/chat' })
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private prisma: PrismaService) {}
  private users: { id_user: string; id_socket: string }[] = [];
  async addUser(id_user: string, id_socket: string) {
    this.users.push({ id_user, id_socket });
  }
  removeUser(id_socket: string) {
    this.users = this.users.filter((user) => user.id_socket !== id_socket);
  }
  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    let id_user: string;
    if (socket && socket.handshake.query)
      id_user = socket.handshake.query.id_user.toString();
    console.log('connected: ', socket.id);
    if (
      !this.users.find(
        (user) => user.id_user === id_user && user.id_socket === socket.id,
      )
    ) {
      this.addUser(id_user, socket.id);
    }
    console.log(this.users);
    socket.on('receiveMessage', this.receiveMessage);
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
        include: { users: true, bannedUsers: true },
      });
      const my_user = await this.prisma.user.findUnique({
        where: {
          id_user: info.id_sender,
        },
        include: {
          blocked_user: true,
          blocked_from: true,
        },
      });
      if (my_user && channel) {
        const room = await this.prisma.room_Chat.findUnique({
          where: {
            id_channel_id_user: {
              id_channel: info.id_channel,
              id_user: my_user.id_user,
            },
          },
        });
        let users = channel.users.map(async (user) => {
          if (
            !channel.bannedUsers.find(
              (banned) => user.id_user === banned.id_user,
            ) &&
            !my_user.blocked_from.find(
              (banned) => user.id_user === banned.id_user,
            ) &&
            !my_user.blocked_user.find(
              (banned) => user.id_user === banned.id_user,
            )
          )
            return user;
        });
        const filtredUsers = await Promise.all(users.filter((user) => user));
        if (!room) return;
        const message = await this.prisma.message.create({
          data: {
            content: info.message,
            id_sender: sender.id_user,
            name_room: room.name,
            id_channel: info.id_channel,
          },
        });
        let us = this.users.map((user) => {
          if (
            filtredUsers.filter((filtred) => {
              filtred && filtred.id_user === user.id_user;
            })
          )
            return user;
        });
        const result = await Promise.all(us.filter((user) => user));
        if (message) {
          console.log('send message');
          info.id_sender = sender.id_user;
          info.created_at = message.created_at;
          result.map((user) => {
            if (user)
              this.server.to(user.id_socket).emit('receiveMessage', info);
          });
        }
      }
    }
  }
  @SubscribeMessage('receiveMessage')
  async receiveMessage(socket: Socket, info: infoType) {
    const user = this.users.filter((user) => user.id_socket === socket.id);
    console.log('user => ', user);
    console.log('info => ', info);
  }
}
