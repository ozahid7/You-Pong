import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PrismaService } from 'src/prisma/prisma.service';
import { Server, Socket } from 'socket.io';

export interface infoType {
  id_sender: string;
  status: 'ONLINE' | 'OFFLINE' | 'INGAME';
}

@Injectable()
@WebSocketGateway()
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

  async handleConnection(socket: Socket) {
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
    const sender = this.users.find((user) => user.id_socket === socket.id);
    if (sender && sender !== undefined) {
      const my_user = await this.prisma.user.findUnique({
        where: {
          id_user: sender.id_user,
        },
      });
      if (my_user) {
        const user = await this.prisma.user.update({
            where:{id_user: sender.id_user},
            data:{status:"ONLINE"}
        })
        if (user) {
            console.log('ONLINE');
            this.server.to(sender.id_socket).emit('status', {id_user: sender.id_user, status: 'ONLINE'});
        }
      }
    }
  }
 async handleDisconnect(socket: Socket) {
     const sender = this.users.find((user) => user.id_socket === socket.id);
     if (sender !== undefined) {
         const my_user = await this.prisma.user.findUnique({
             where: {
                 id_user: sender.id_user,
                },
            });
            if (my_user) {
                const user = await this.prisma.user.update({
                    where:{id_user: sender.id_user},
                    data:{status:"OFFLINE"}
                })
                if (user) {
                    console.log('OFFLINE');
                    
                    this.server.to(sender.id_socket).emit('status', {id_user: sender.id_user, status: 'OFFLINE'});
                }
            }
        }
        this.removeUser(socket.id);
        console.log('disconnected: ', socket.id);
        console.log(this.users);
  }

  @SubscribeMessage('inGame')
  async inGame(
    @ConnectedSocket() socket: Socket,
  ) {
    const sender = this.users.find((user) => user.id_socket === socket.id);
    if (sender !== undefined) {
      const my_user = await this.prisma.user.findUnique({
        where: {
          id_user: sender.id_user,
        },
      });
      if (my_user) {
        const user = await this.prisma.user.update({
            where:{id_user: sender.id_user, status: "ONLINE"},
            data:{status:"INGAME"}
        })
        if (user) {
            console.log('INGAME');
            this.server.to(sender.id_socket).emit('status', {id_user: sender.id_user, status: 'INGAME'});
        }
      }
    }
  }

  @SubscribeMessage('endGame')
  async endGame(
    @ConnectedSocket() socket: Socket,
  ) {
    const sender = this.users.find((user) => user.id_socket === socket.id);
    if (sender !== undefined) {
      const my_user = await this.prisma.user.findUnique({
        where: {
          id_user: sender.id_user,
        },
      });
      if (my_user) {
        const user = await this.prisma.user.update({
            where:{id_user: sender.id_user, status: "INGAME"},
            data:{status:"ONLINE"}
        })
        if (user) {
            console.log('ONLINE');
            this.server.to(sender.id_socket).emit('status', {id_user: sender.id_user, status: 'ONLINE'});
        }
      }
    }
  }
}
