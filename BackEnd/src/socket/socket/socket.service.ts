import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { roomDto } from '../../chat/dto/room.create.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReadableByteStreamControllerCallback } from 'stream/web';

@Injectable()
@WebSocketGateway()
export class SocketService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}
  private room;
  private users: { userId: string; socketId: string }[] = [];
  private msgInfo: { userId: string; senderId: string; message: string };

  async addUser(userId: string, socketId: string) {
    await this.users.push({ userId, socketId });
  }
  async removeUser(socketId: string) {
    this.users.filter((user) => user.socketId !== socketId);
  }
  @WebSocketServer()
  server: Server;
  onModuleInit() {
    this.server.on('connection', async (socket: Socket) => {
      console.log(socket.id);
      this.server.on('addUser', async (userId: string) => {
        this.addUser(userId, socket.id);
      });
      this.room = await this.prisma.room_Chat.findFirst({
        where: {
          name: 'room1',
        },
      });
      if (socket.rooms[this.room.name]) socket.join(this.room.name);
      console.log('joined ', this.room.name);
    });
    this.server.on('DM', async ({ receiverId, idRoom, message }) => {
      //Block condition
      await this.prisma.message.create({
        data: {
          content: message,
          id_room: idRoom,
        },
      });
      const receiverUser = this.users.find((user) => {
        user.userId === receiverId;
      });
      if (receiverUser !== undefined) {
        this.server.to(receiverUser.socketId).emit(message);
        console.log(message);
      }
    });

    this.server.on('disconnect', async (socket: Socket) => {
      this.removeUser(socket.id);
      console.log('Disconnected');
    });
  }
  @SubscribeMessage('newMessage')
  newMessage(@MessageBody() body: any) {
    console.log(body);

    this.server.to(this.room.name).emit('received', {
      msg: 'message received',
      body,
    });
  }
}
