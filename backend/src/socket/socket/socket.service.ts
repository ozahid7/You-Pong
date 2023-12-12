// import { Injectable, OnModuleInit, Req, UseGuards} from '@nestjs/common';
// import {
//   ConnectedSocket,
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { roomDto } from '../../chat/dto/room.create.dto';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { ReadableByteStreamControllerCallback } from 'stream/web';
// import { AuthGuard } from '@nestjs/passport';
// import { JsonObject } from '@prisma/client/runtime/library';
// import { FindUserService } from 'src/user/services';
// import { Request } from 'express';

// @UseGuards(AuthGuard('jwt'))
// @Injectable()
// // @UseGuards(AuthGuard('jwt'))
// @WebSocketGateway()
// export class SocketService implements OnModuleInit{
//   constructor(private prisma: PrismaService,
//               private userFind: FindUserService,
//               ) {}
//   private room;
//   private users: { userId: string; socketId: string }[] = [];
//   private msgInfo: { userId: string; senderId: string; message: string };

//   async addUser(userId: string, socketId: string) {
//     await this.users.push({ userId, socketId });
//   }
//   async removeUser(socketId: string) {
//     this.users.filter((user) => user.socketId !== socketId);
//   }
//   @WebSocketServer()
//   server: Server;
//   onModuleInit() {
//   //   this.server.on('connection', async (socket: Socket) => {
//   //     console.log(socket.id);
//   //     this.server.on('addUser', async (userId: string) => {
//   //       this.addUser(userId, socket.id);
//   //     });
//   //     this.room = await this.prisma.room_Chat.findFirst({
//   //       where: {
//   //         name: 'room1',
//   //       },
//   //     });
//   //     if (socket.rooms[this.room.name]) socket.join(this.room.name);
//   //     console.log('joined ', this.room.name);
//   //   });
//   //   this.server.on('DM', async ({ receiverId, idRoom, message }) => {
//   //     //Block condition
//   //     await this.prisma.message.create({
//   //       data: {
//   //         content: message,
//   //         id_room: idRoom,
//   //       },
//   //     });
//   //     const receiverUser = this.users.find((user) => {
//   //       user.userId === receiverId;
//   //     });
//   //     if (receiverUser !== undefined) {
//   //       this.server.to(receiverUser.socketId).emit(message);
//   //       console.log(message);
//   //     }
//   //   });

//   //   this.server.on('disconnect', async (socket: Socket) => {
//   //     this.removeUser(socket.id);
//   //     console.log('Disconnected');
//     // });
//   }

//   @SubscribeMessage('newMessage')
//   async newMessage(@MessageBody() body: JsonObject, @ConnectedSocket() client: Socket) {
//     console.log(body);
//     this.server.emit('le message', "toooom");
//     }

//     async handleConnection(client: Socket): Promise<void> {
//       // const user = await this.userFind.finduserById(req);
//       // console.log(req);

//       console.log(`Client connected: ${client.id}`);
//     }

//     handleDisconnect(client: Socket): void {
//       console.log(`Client disconnected: ${client.id}`);
//   }
// }
