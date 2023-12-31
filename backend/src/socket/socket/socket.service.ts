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

export enum map {
  GREEN,
  CLASSIC,
  ORANGE,
}
export enum mode {
  HARD,
  EASY,
}
export interface infoGame {
  id_game: string;
  id_sender: string;
  id_receiver: string;
  socket_player: string;
  map: map;
  mode: mode;
}
@Injectable()
@WebSocketGateway()
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private prisma: PrismaService) {}
  private users: { id_user: string; id_socket: string; inGame: boolean }[] = [];
  private privateGame: {
    id_game: string;
    id_player: string;
    socket_player: string;
    id_opponent: string;
    map: map;
    mode: mode;
  }[] = [];
  async addUser(id_user: string, id_socket: string) {
    this.users.push({ id_user, id_socket, inGame: false });
  }
  async removeUser(id_socket: string) {
    this.users = this.users.filter((user) => user.id_socket !== id_socket);
  }
  async addPrivateGame(
    id_game: string,
    id_player: string,
    socket_player: string,
    map: map,
    mode: mode,
  ) {
    if (
      this.privateGame.find(
        (game) => game.id_game === id_game && game.id_player === id_player,
      )
    )
      this.removePrivateGame(id_player, id_game);
    this.privateGame.push({
      id_game,
      id_player,
      map,
      mode,
      id_opponent: null,
      socket_player,
    });
  }
  async removePrivateGame(id_player: string, id_game: string) {
    this.privateGame = this.privateGame.filter(
      (user) => user.id_player !== id_player && user.id_game !== id_game,
    );
  }
  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    try {
      let id_user: string;
      if (socket && socket.handshake.query)
        id_user = socket.handshake.query.id_user.toString();
      console.log('connected: ', socket.id);
      if (!this.users.find((user) => user.id_socket === socket.id)) {
        this.addUser(id_user, socket.id);
      }
      socket.join(id_user);
      console.log(this.users);
      const sender = this.users.find((user) => user.id_socket === socket.id);
      if (sender && sender !== undefined) {
        const my_user = await this.prisma.user.findUnique({
          where: {
            id_user: sender.id_user,
            status: 'OFFLINE',
          },
        });
        if (my_user && my_user !== undefined) {
          const user = await this.prisma.user.updateMany({
            where: { id_user: my_user.id_user },
            data: { status: 'ONLINE' },
          });
          if (user) {
            console.log('ONLINE ,');
            this.server
              .to(sender.id_socket)
              .emit('status', { id_user: my_user.id_user, status: 'ONLINE' });
          }
        }
      }
    } catch (error) {
      console.log('Error in connect : ', error);
    }
  }
  async handleDisconnect(socket: Socket) {
    try {
      const sender = this.users.find((user) => user.id_socket === socket.id);
      if (sender && sender !== undefined) {
        const my_user = await this.prisma.user.findUnique({
          where: {
            id_user: sender.id_user,
          },
        });
        let duplicate = 0;
        this.users.forEach((user) => {
          if (user.id_user === sender.id_user) duplicate++;
        });
        if (my_user && my_user !== undefined) {
          if (duplicate === 1) {
            const user = await this.prisma.user.updateMany({
              where: { id_user: my_user.id_user },
              data: { status: 'OFFLINE' },
            });
            if (user) {
              console.log('OFFLINE');
              this.server.to(sender.id_socket).emit('status', {
                id_user: my_user.id_user,
                status: 'OFFLINE',
              });
            }
          } else if (sender.inGame) {
            const user = await this.prisma.user.updateMany({
              where: { id_user: my_user.id_user },
              data: { status: 'ONLINE' },
            });
            if (user) {
              console.log('ONLINE');
              this.server
                .to(sender.id_socket)
                .emit('status', { id_user: my_user.id_user, status: 'ONLINE' });
            }
          }
        }
      }
      this.removeUser(socket.id);
      console.log('disconnected: ', socket.id);
      console.log(this.users);
    } catch (error) {
      console.log('Error in disconnect : ', error);
    }
  }

  @SubscribeMessage('inGame')
  async inGame(@ConnectedSocket() socket: Socket) {
    try {
      const sender = this.users.find((user) => user.id_socket === socket.id);
      if (sender && sender !== undefined) {
        const my_user = await this.prisma.user.findUnique({
          where: {
            id_user: sender.id_user,
            status: 'ONLINE',
          },
        });
        if (my_user && my_user !== undefined) {
          const user = await this.prisma.user.updateMany({
            where: { id_user: my_user.id_user },
            data: { status: 'INGAME' },
          });
          if (user) {
            console.log('INGAME');
            sender.inGame = true;
            this.server
              .to(sender.id_socket)
              .emit('status', { id_user: sender.id_user, status: 'INGAME' });
          }
        }
      }
    } catch (error) {
      console.log('Error in inGame : ', error);
    }
  }

  @SubscribeMessage('online')
  async online(@ConnectedSocket() socket: Socket) {
    try {
      const sender = this.users.find((user) => user.id_socket === socket.id);
      if (sender && sender !== undefined) {
        const my_user = await this.prisma.user.findUnique({
          where: {
            id_user: sender.id_user,
            NOT: { status: 'ONLINE' },
          },
        });
        if (my_user && my_user !== undefined) {
          const user = await this.prisma.user.updateMany({
            where: { id_user: my_user.id_user },
            data: { status: 'ONLINE' },
          });
          if (user) {
            console.log('ONLINE');
            sender.inGame = false;
            this.server
              .to(sender.id_socket)
              .emit('status', { id_user: my_user.id_user, status: 'ONLINE' });
          }
        }
      }
    } catch (error) {
      console.log('Error in online : ', error);
    }
  }

  @SubscribeMessage('offline')
  async offline(socket: Socket) {
    try {
      const sender = this.users.find((user) => user.id_socket === socket.id);
      if (sender && sender !== undefined) {
        const my_user = await this.prisma.user.findUnique({
          where: {
            id_user: sender.id_user,
          },
        });
        let duplicate = 0;
        this.users.forEach((user) => {
          if (user.id_user === sender.id_user) duplicate++;
        });
        if (my_user && my_user !== undefined && duplicate === 1) {
          const user = await this.prisma.user.updateMany({
            where: { id_user: my_user.id_user },
            data: { status: 'OFFLINE' },
          });
          if (user) {
            console.log('OFFLINE');
            sender.inGame = false;
            this.server
              .to(sender.id_socket)
              .emit('status', { id_user: my_user.id_user, status: 'OFFLINE' });
          }
        }
      }
      this.removeUser(socket.id);
      console.log('disconnected: ', socket.id);
      console.log(this.users);
    } catch (error) {
      console.log('Error in offline : ', error);
    }
  }

  @SubscribeMessage('invite')
  async inviteGame(
    @ConnectedSocket() socket: Socket,
    @MessageBody() info: infoGame,
  ) {
    try {
      const sender = this.users.find((user) => user.id_socket === socket.id);
      const receiver = this.users.find(
        (user) => user.id_user === info.id_receiver,
      );
      if (
        sender &&
        sender !== undefined &&
        receiver &&
        receiver !== undefined &&
        sender.id_user !== receiver.id_user
      ) {
        const my_user = await this.prisma.user.findUnique({
          where: {
            id_user: sender.id_user,
          },
        });
        if (my_user) {
          info.socket_player = sender.id_socket;
          this.addPrivateGame(
            info.id_game,
            info.id_sender,
            sender.id_socket,
            info.map,
            info.mode,
          );
          this.server.to(receiver.id_user).emit('invitation', {
            info,
            username: my_user.username,
            avatar: my_user.avatar,
          });
        }
      }
    } catch (error) {
      console.log('Error in invite : ', error);
    }
  }

  @SubscribeMessage('accept')
  async acceptGame(
    @ConnectedSocket() socket: Socket,
    @MessageBody() info: infoGame,
  ) {
    try {
      const sender = this.users.find((user) => user.id_socket === socket.id);
      const receiver = this.users.find(
        (user) => user.id_socket === info.socket_player,
      );
      if (
        sender &&
        sender !== undefined &&
        receiver &&
        receiver !== undefined &&
        sender.id_user !== receiver.id_user
      ) {
        const my_user = await this.prisma.user.findUnique({
          where: {
            id_user: sender.id_user,
          },
        });
        const otherUser = await this.prisma.user.findUnique({
          where: {
            id_user: receiver.id_user,
          },
        });
        if (my_user && otherUser) {
          if (this.privateGame.find((game) => game.id_game === info.id_game)) {
            this.removePrivateGame(info.id_sender, info.id_game);
            const game = await this.prisma.match_History.create({
              data: {
                id_player: my_user.id_user,
                id_opponent: otherUser.id_user,
              },
            });
            if (game) {
              this.server.to(receiver.id_socket).emit('accepted', {
                info,
                username: my_user.username,
                avatar: my_user.avatar,
                level: my_user.level,
                id_match: game.id_match,
              });
            }
          } else {
            this.server.to(sender.id_user).emit('canceled', {
              info,
              username: my_user.username,
              avatar: my_user.avatar,
            });
          }
        }
      }
    } catch (error) {
      console.log('Error in accept : ', error);
    }
  }

  @SubscribeMessage('refuse')
  async refuseGame(
    @ConnectedSocket() socket: Socket,
    @MessageBody() info: infoGame,
  ) {
    try {
      const sender = this.users.find((user) => user.id_socket === socket.id);
      const receiver = this.users.find(
        (user) => user.id_socket === info.socket_player,
      );
      if (
        sender &&
        sender !== undefined &&
        receiver &&
        receiver !== undefined &&
        sender.id_user !== receiver.id_user
      ) {
        const my_user = await this.prisma.user.findUnique({
          where: {
            id_user: sender.id_user,
          },
        });
        const otherUser = await this.prisma.user.findUnique({
          where: {
            id_user: receiver.id_user,
          },
        });
        if (my_user && otherUser) {
          if (this.privateGame.find((game) => game.id_game === info.id_game)) {
            this.removePrivateGame(info.id_sender, info.id_game);
            this.server.to(receiver.id_socket).emit('refused', {
              info,
              username: my_user.username,
              avatar: my_user.avatar,
            });
          }
        }
      }
    } catch (error) {
      console.log('Error in refuse : ', error);
    }
  }

  @SubscribeMessage('cancel')
  async cancelGame(
    @ConnectedSocket() socket: Socket,
    @MessageBody() info: infoGame,
  ) {
    try {
      console.log('hello from cancel');
      const sender = this.users.find((user) => user.id_socket === socket.id);
      const receiver = this.users.find(
        (user) => user.id_user === info.id_receiver,
      );
      if (
        sender &&
        sender !== undefined &&
        receiver &&
        receiver !== undefined &&
        sender.id_user !== receiver.id_user
      ) {
        const my_user = await this.prisma.user.findUnique({
          where: {
            id_user: sender.id_user,
          },
        });
        const otherUser = await this.prisma.user.findUnique({
          where: {
            id_user: receiver.id_user,
          },
        });
        if (my_user && otherUser) {
          if (this.privateGame.find((game) => game.id_game === info.id_game)) {
            this.removePrivateGame(info.id_sender, info.id_game);
            this.server.to(receiver.id_user).emit('canceled', {
              info,
              username: my_user.username,
              avatar: my_user.avatar,
            });
          }
        }
      }
    } catch (error) {
      console.log('Error in cancel : ', error);
    }
  }
}
