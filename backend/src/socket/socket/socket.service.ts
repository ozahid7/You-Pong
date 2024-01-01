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
import { on } from 'events';
import { log } from 'util';

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
export interface infoPlayer {
  id_sender: string;
  map: string;
  mode: string;
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

  private classicHard: {
    id_user: string;
    id_socket: string;
  }[] = [];
  private orangeHard: {
    id_user: string;
    id_socket: string;
  }[] = [];
  private greenHard: {
    id_user: string;
    id_socket: string;
  }[] = [];
  private classicEasy: {
    id_user: string;
    id_socket: string;
  }[] = [];
  private orangeEasy: {
    id_user: string;
    id_socket: string;
  }[] = [];
  private greenEasy: {
    id_user: string;
    id_socket: string;
  }[] = [];

  async addUser(id_user: string, id_socket: string) {
    this.users.push({ id_user, id_socket, inGame: false });
  }

  async removeUser(id_socket: string) {
    this.users = this.users.filter((user) => user.id_socket !== id_socket);
  }

  async removePrvGame(id_socket: string) {
    this.privateGame = this.privateGame.filter(
      (game) => game.socket_player !== id_socket,
    );
  }

  async removePlayer(id_socket: string) {
    this.classicEasy = this.classicEasy.filter(
      (game) => game.id_socket !== id_socket,
    );
    this.classicHard = this.classicHard.filter(
      (game) => game.id_socket !== id_socket,
    );
    this.orangeEasy = this.orangeEasy.filter(
      (game) => game.id_socket !== id_socket,
    );
    this.orangeHard = this.orangeHard.filter(
      (game) => game.id_socket !== id_socket,
    );
    this.greenEasy = this.greenEasy.filter(
      (game) => game.id_socket !== id_socket,
    );
    this.greenHard = this.greenHard.filter(
      (game) => game.id_socket !== id_socket,
    );
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
      this.removePrvGame(socket_player);
    this.privateGame.push({
      id_game,
      id_player,
      map,
      mode,
      id_opponent: null,
      socket_player,
    });
  }

  // async removePrivateGame(id_player: string, id_game: string) {
  //   this.privateGame = this.privateGame.filter(
  //     (user) => user.id_player !== id_player && user.id_game !== id_game,
  //   );
  // }

  async launch_game(player, opponent) {
    const player_user = await this.prisma.user.findUnique({
      where: {
        id_user: player.id_user,
      },
    });
    const opponent_user = await this.prisma.user.findUnique({
      where: {
        id_user: opponent.id_user,
      },
    });
    if (player_user && opponent_user) {
      const game = await this.prisma.match_History.create({
        data: {
          id_player: player_user.id_user,
          id_opponent: opponent_user.id_user,
        },
      });
      if (game) {
        this.server.to(player.id_socket).emit('acceptedGame', {
          username: player_user.username,
          avatar: player_user.avatar,
          level: player_user.level,
          id_match: game.id_match,
        });
        this.server.to(opponent.id_socket).emit('acceptedGame', {
          username: opponent_user.username,
          avatar: opponent_user.avatar,
          level: opponent_user.level,
          id_match: game.id_match,
        });
      } else {
        this.server.to(player.id_socket).emit('canceledGame', {
          username: player_user.username,
          avatar: player_user.avatar,
          level: player_user.level,
          id_match: game.id_match,
        });
        this.server.to(opponent.id_socket).emit('canceledGame', {
          username: opponent_user.username,
          avatar: opponent_user.avatar,
          level: opponent_user.level,
          id_match: game.id_match,
        });
      }
    }
  }

  async matching(info: infoPlayer, id_user: string, id_socket: string) {
    const mode_map = `${info.map}_${info.mode}`;
    switch (mode_map) {
      case 'CLASSIC_HARD':
        this.classicHard.push({
          id_user: id_user,
          id_socket: id_socket,
        });
        if (this.classicHard.length > 1) {
          const player = this.classicHard.shift();
          const opponent = this.classicHard.shift();
          this.launch_game(player, opponent);
        }
        break;
      case 'ORANGE_HARD':
        this.orangeHard.push({
          id_user: id_user,
          id_socket: id_socket,
        });
        if (this.orangeHard.length > 1) {
          const player = this.orangeHard.shift();
          const opponent = this.orangeHard.shift();
          this.launch_game(player, opponent);
        }
        break;
      case 'GREEN_HARD':
        this.greenHard.push({
          id_user: id_user,
          id_socket: id_socket,
        });
        if (this.greenHard.length > 1) {
          const player = this.greenHard.shift();
          const opponent = this.greenHard.shift();
          this.launch_game(player, opponent);
        }
        break;
      case 'CLASSIC_EASY':
        this.classicEasy.push({
          id_user: id_user,
          id_socket: id_socket,
        });
        if (this.classicEasy.length > 1) {
          const player = this.classicEasy.shift();
          const opponent = this.classicEasy.shift();
          this.launch_game(player, opponent);
        }
        break;
      case 'ORANGE_EASY':
        this.orangeEasy.push({
          id_user: id_user,
          id_socket: id_socket,
        });
        if (this.orangeEasy.length > 1) {
          const player = this.orangeEasy.shift();
          const opponent = this.orangeEasy.shift();
          this.launch_game(player, opponent);
        }
        break;
      case 'GREEN_EASY':
        this.greenEasy.push({
          id_user: id_user,
          id_socket: id_socket,
        });
        if (this.greenEasy.length > 1) {
          const player = this.greenEasy.shift();
          const opponent = this.greenEasy.shift();
          this.launch_game(player, opponent);
        }
      default:
        console.error('Invalid map or mode !');
        break;
    }
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
      this.removePlayer(socket.id);
      this.removePrvGame(socket.id);
      console.log('disconnected: ', socket.id);
      console.log(this.users);
    } catch (error) {
      console.log('Error in disconnect : ', error);
    }
  }

  @SubscribeMessage('inGame')
  async inGame(
    @ConnectedSocket() socket: Socket,
    @MessageBody() info: infoPlayer,
  ) {
    try {
      const sender = this.users.find((user) => user.id_socket === socket.id);
      if (sender && sender !== undefined && sender.id_user === info.id_sender) {
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

            //logic matching
            this.matching(info, sender.id_user, sender.id_socket);
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
            this.removePlayer(sender.id_socket);
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
      this.removePlayer(socket.id);
      this.removePrvGame(socket.id);
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
      this.removePrvGame(info.socket_player);
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
            // this.removePrivateGame(info.id_sender, info.id_game);
            this.removePrvGame(info.socket_player);
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
            // this.removePrivateGame(info.id_sender, info.id_game);
            this.removePrvGame(info.socket_player);
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
            // this.removePrivateGame(info.id_sender, info.id_game);
            this.removePrvGame(info.socket_player);
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
