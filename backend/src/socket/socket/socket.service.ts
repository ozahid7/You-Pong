import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { GameService } from 'src/game/game.service';
import { renderDto } from 'src/game/dto';

export enum map {
  GREEN,
  CLASSIC,
  ORANGE,
}
export enum mode {
  HARD,
  EASY,
}
// export interface infoRequest {
//   id_game: string;
//   id_sender: string;
//   id_receiver: string;
//   socket_player: string;
//   map: map;
//   mode: mode;
// }
export interface infoType {
  id_channel: string;
  id_sender: string;
  content: string;
  created_at: Date;
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
  is_public: boolean;
  map: string;
  mode: string;
}
@Injectable()
@WebSocketGateway()
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private prisma: PrismaService,
    private gameService: GameService,
  ) {}
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
    id_opponent: string,
    socket_player: string,
    map: map,
    mode: mode,
  ) {
    if (
      this.privateGame.find(
        (game) =>
          game.id_game === id_game &&
          game.id_player === id_player &&
          game.id_opponent === id_opponent,
      )
    )
      this.removePrvGame(socket_player);
    this.privateGame.push({
      id_game,
      id_player,
      map,
      mode,
      id_opponent: id_opponent,
      socket_player,
    });
  }

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
        this.server.to(opponent.id_socket).emit('acceptedGame', {
          username: player_user.username,
          avatar: player_user.avatar,
          level: player_user.level,
          id_match: game.id_match,
        });
        this.server.to(player.id_socket).emit('acceptedGame', {
          username: opponent_user.username,
          avatar: opponent_user.avatar,
          level: opponent_user.level,
          id_match: game.id_match,
        });
        this.gameService.putLvlRank(game.id_match);
      } else {
        this.server.to(player.id_socket).emit('canceledGame', {
          username: player_user.username,
          avatar: player_user.avatar,
          level: player_user.level,
          id_match: '',
        });
        this.server.to(opponent.id_socket).emit('canceledGame', {
          username: opponent_user.username,
          avatar: opponent_user.avatar,
          level: opponent_user.level,
          id_match: '',
        });
      }
    }
  }

  async pushToQueue(
    queue: {
      id_user: string;
      id_socket: string;
    }[],
    id_user: string,
    id_socket: string,
  ) {
    if (queue.find((waiting) => id_user === waiting.id_user) === undefined) {
      queue.push({
        id_user: id_user,
        id_socket: id_socket,
      });
    }
  }

  async filterQueue(
    queue: {
      id_user: string;
      id_socket: string;
    }[],
    id_user: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
      include: { blocked_from: true, blocked_user: true },
    });
    if (!user) return [];
    const filtresQueue = queue.map((q) => {
      if (
        !user.blocked_from.some((block) => block.id_user === q.id_user) &&
        !user.blocked_user.some((block) => block.id_user === q.id_user) &&
        q.id_user !== id_user
      )
        return q;
    });
    return await Promise.all(filtresQueue.filter((q) => q && q !== undefined));
  }

  async matching(info: infoPlayer, id_user: string, id_socket: string) {
    const mode_map = `${info.map}_${info.mode}`;
    const player = this.users.find(
      (user) => user.id_user === id_user && user.id_socket === user.id_socket,
    );
    let filtred;
    if (player) {
      switch (mode_map) {
        case 'CLASSIC_HARD':
          filtred = await this.filterQueue(this.classicHard, id_user);
          if (filtred.length > 0) {
            const opponent = filtred.shift();
            this.classicHard = this.classicHard.filter(
              (queue) => queue.id_user !== opponent.id_user,
            );
            this.launch_game(player, opponent);
          } else this.pushToQueue(this.classicHard, id_user, id_socket);
          break;
        case 'ORANGE_HARD':
          filtred = await this.filterQueue(this.orangeHard, id_user);
          if (filtred.length > 0) {
            const opponent = filtred.shift();
            this.orangeHard = this.orangeHard.filter(
              (queue) => queue.id_user !== opponent.id_user,
            );
            this.launch_game(player, opponent);
          } else this.pushToQueue(this.orangeHard, id_user, id_socket);
          break;
        case 'GREEN_HARD':
          filtred = await this.filterQueue(this.greenHard, id_user);
          if (filtred.length > 0) {
            const opponent = filtred.shift();
            this.greenHard = this.greenHard.filter(
              (queue) => queue.id_user !== opponent.id_user,
            );
            this.launch_game(player, opponent);
          } else this.pushToQueue(this.greenHard, id_user, id_socket);
          break;
        case 'CLASSIC_EASY':
          filtred = await this.filterQueue(this.classicEasy, id_user);
          if (filtred.length > 0) {
            const opponent = filtred.shift();
            this.classicEasy = this.classicEasy.filter(
              (queue) => queue.id_user !== opponent.id_user,
            );
            this.launch_game(player, opponent);
          } else this.pushToQueue(this.classicEasy, id_user, id_socket);
          break;
        case 'ORANGE_EASY':
          filtred = await this.filterQueue(this.orangeEasy, id_user);
          if (filtred.length > 0) {
            const opponent = filtred.shift();
            this.orangeEasy = this.orangeEasy.filter(
              (queue) => queue.id_user !== opponent.id_user,
            );
            this.launch_game(player, opponent);
          } else this.pushToQueue(this.orangeEasy, id_user, id_socket);
          break;
        case 'GREEN_EASY':
          filtred = await this.filterQueue(this.greenEasy, id_user);
          if (filtred.length > 0) {
            const opponent = filtred.shift();
            this.greenEasy = this.greenEasy.filter(
              (queue) => queue.id_user !== opponent.id_user,
            );
            this.launch_game(player, opponent);
          } else this.pushToQueue(this.greenEasy, id_user, id_socket);
          break;
        default:
          console.error(`Invalid map or mode : ${mode_map} !`);
          break;
      }
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

  @SubscribeMessage('newMessage')
  async newMessage(
    @MessageBody() info: infoType,
    @ConnectedSocket() socket: Socket,
  ) {
    const sender = this.users.find((user) => user.id_socket === socket.id);
    const receiver = this.users.find((user) => user.id_user === info.id_sender);
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
            member_status: 'NONE',
          },
        });
        if (!room) return;
        let users = channel.users.map((user) => {
          if (
            !my_user.blocked_from.some(
              (blocked) => blocked.id_user === user.id_user,
            ) &&
            !my_user.blocked_user.some(
              (blocked) => blocked.id_user === user.id_user,
            )
          )
            return user;
        });
        const filtredUsers = await Promise.all(
          users.filter((user) => user && user !== undefined),
        );
        const message = await this.prisma.message.create({
          data: {
            content: info.content,
            id_sender: sender.id_user,
            name_room: room.name,
            id_channel: info.id_channel,
          },
        });
        let us = filtredUsers.map((filtred) => {
          if (
            this.users.filter((user) => {
              filtred.id_user === user.id_user;
            }) !== undefined
          )
            return filtred;
        });
        const result = await Promise.all(us.filter((user) => user));
        if (message) {
          console.log('send message');
          info.id_sender = sender.id_user;
          info.created_at = message.created_at;
          result.map((user) => {
            if (user) {
              this.server.to(user.id_user).emit('receiveMessage', info);
              if (user.id_user !== info.id_sender) {
                this.server.to(user.id_user).emit('addNotif', {
                  id_user: my_user.id_user,
                  username: my_user.username,
                  avatar: my_user.avatar,
                  is_message: true,
                });
              }
            }
          });
        }
      }
    }
  }

  @SubscribeMessage('inGame')
  async inGame(
    @ConnectedSocket() socket: Socket,
    @MessageBody() info: infoPlayer,
  ) {
    try {
      const sender = this.users.find((user) => user.id_socket === socket.id);
      if (
        sender &&
        sender !== undefined &&
        info &&
        info !== undefined &&
        sender.id_user === info.id_sender
      ) {
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
            if (info.is_public)
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
          if (!sender.inGame && my_user.status === 'INGAME') return;
          else {
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
            info.id_receiver,
            sender.id_socket,
            info.map,
            info.mode,
          );
          this.server.to(receiver.id_user).emit('invitation', {
            info,
            username: my_user.username,
            avatar: my_user.avatar,
            level: my_user.level,
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
              this.gameService.putLvlRank(game.id_match);
            }
          } else {
            this.server.to(sender.id_user).emit('canceled', {
              info,
              username: my_user.username,
              avatar: my_user.avatar,
              level: my_user.level,
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
            this.removePrvGame(info.socket_player);
            this.server.to(receiver.id_socket).emit('refused', {
              info,
              username: my_user.username,
              avatar: my_user.avatar,
              level: my_user.level,
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
            this.removePrvGame(info.socket_player);
            this.server.to(receiver.id_user).emit('canceled', {
              info,
              username: my_user.username,
              avatar: my_user.avatar,
              level: my_user.level,
            });
          }
        }
      }
    } catch (error) {
      console.log('Error in cancel : ', error);
    }
  }

  @SubscribeMessage('addRequest')
  async addRequest(
    @ConnectedSocket() socket: Socket,
    @MessageBody() id_receiver: string,
  ) {
    try {
      const sender = this.users.find((user) => user.id_socket === socket.id);
      const receiver = this.users.find((user) => user.id_user === id_receiver);
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
          this.server.to(receiver.id_user).emit('addNotif', {
            id_user: my_user.id_user,
            username: my_user.username,
            avatar: my_user.avatar,
            is_message: false,
          });
        }
      }
    } catch (error) {
      console.log('Error in add request : ', error);
    }
  }

  @SubscribeMessage('removeRequest')
  async removeRequest(
    @ConnectedSocket() socket: Socket,
    @MessageBody() info: { id_receiver: string; is_message: boolean },
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
        const otherUser = await this.prisma.user.findUnique({
          where: {
            id_user: receiver.id_user,
          },
        });
        if (my_user && otherUser) {
          this.server.to(receiver.id_user).emit('removeNotif', {
            id_user: my_user.id_user,
            username: my_user.username,
            avatar: my_user.avatar,
            is_message: info.is_message,
          });
        }
      }
    } catch (error) {
      console.log('Error in remove request : ', error);
    }
  }

  // ---------------- adam start here ----------------------

  private ball: {
    x: number;
    y: number;
    speed: number;
    radius: number;
    color: string;
    dx: number;
    dy: number;
  } = {
    x: 60,
    y: 60,
    speed: 0.9,
    radius: 10,
    color: '',
    dx: 5,
    dy: 0,
  };
  @SubscribeMessage('updateFrame')
  async updateFrame(
    @ConnectedSocket() socket: Socket,
    @MessageBody() dto: renderDto,
  ) {
    try {
      const theGame = this.prisma.match_History.findUnique({
        where: {
          id_match: dto.id_match,
        },
      });
      if (!theGame) throw new NotFoundException('Game not found');
      else {
        // if ball touchs the wall
        if (
          this.ball.x + this.ball.radius >= dto.fieald.width ||
          this.ball.x - this.ball.radius <= 0
        ) {
          this.ball.dx = -this.ball.dx;
        }
        this.ball.x += this.ball.dx;
        dto.ball.x = this.ball.x;
        this.server.to((await theGame).id_player).emit('render', dto);
        this.server.to((await theGame).id_opponent).emit('render', dto);
      }
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  // ---------------- adam end here ----------------------
}
