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
import { GameService } from 'src/game/game.service';
import { renderDto } from 'src/game/dto';
import { gameData, infoGame, infoPlayer, infoType } from './socket.interfaces';
import { SocketMethodes } from './socket.methodes';

@Injectable()
@WebSocketGateway()
export class SocketService
  extends SocketMethodes
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    prisma: PrismaService,
    private gameService: GameService,
  ) {
    super(prisma);
  }

  async launch_game(player, opponent, info: infoPlayer) {
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
        this.addGame(
          game.id_player,
          player.id_socket,
          game.id_opponent,
          opponent.id_socket,
          game.id_match,
          info.map,
          info.mode,
        );
        this.server.to(opponent.id_socket).emit('acceptedGame', {
          username: player_user.username,
          avatar: player_user.avatar,
          level: player_user.level,
          id_match: game.id_match,
          id_player: game.id_player,
          id_opponent: game.id_opponent,
        });
        this.server.to(player.id_socket).emit('acceptedGame', {
          username: opponent_user.username,
          avatar: opponent_user.avatar,
          level: opponent_user.level,
          id_match: game.id_match,
          id_player: game.id_player,
          id_opponent: game.id_opponent,
        });
      } else {
        this.server.to(player.id_socket).emit('canceledGame', {
          username: player_user.username,
          avatar: player_user.avatar,
          level: player_user.level,
          id_match: '',
          id_player: '',
          id_opponent: '',
        });
        this.server.to(opponent.id_socket).emit('canceledGame', {
          username: opponent_user.username,
          avatar: opponent_user.avatar,
          level: opponent_user.level,
          id_match: '',
          id_player: '',
          id_opponent: '',
        });
      }
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
            this.launch_game(player, opponent, info);
          } else this.pushToQueue(this.classicHard, id_user, id_socket);
          break;
        case 'ORANGE_HARD':
          filtred = await this.filterQueue(this.orangeHard, id_user);
          if (filtred.length > 0) {
            const opponent = filtred.shift();
            this.orangeHard = this.orangeHard.filter(
              (queue) => queue.id_user !== opponent.id_user,
            );
            this.launch_game(player, opponent, info);
          } else this.pushToQueue(this.orangeHard, id_user, id_socket);
          break;
        case 'GREEN_HARD':
          filtred = await this.filterQueue(this.greenHard, id_user);
          if (filtred.length > 0) {
            const opponent = filtred.shift();
            this.greenHard = this.greenHard.filter(
              (queue) => queue.id_user !== opponent.id_user,
            );
            this.launch_game(player, opponent, info);
          } else this.pushToQueue(this.greenHard, id_user, id_socket);
          break;
        case 'CLASSIC_EASY':
          filtred = await this.filterQueue(this.classicEasy, id_user);
          if (filtred.length > 0) {
            const opponent = filtred.shift();
            this.classicEasy = this.classicEasy.filter(
              (queue) => queue.id_user !== opponent.id_user,
            );
            this.launch_game(player, opponent, info);
          } else this.pushToQueue(this.classicEasy, id_user, id_socket);
          break;
        case 'ORANGE_EASY':
          filtred = await this.filterQueue(this.orangeEasy, id_user);
          if (filtred.length > 0) {
            const opponent = filtred.shift();
            this.orangeEasy = this.orangeEasy.filter(
              (queue) => queue.id_user !== opponent.id_user,
            );
            this.launch_game(player, opponent, info);
          } else this.pushToQueue(this.orangeEasy, id_user, id_socket);
          break;
        case 'GREEN_EASY':
          filtred = await this.filterQueue(this.greenEasy, id_user);
          if (filtred.length > 0) {
            const opponent = filtred.shift();
            this.greenEasy = this.greenEasy.filter(
              (queue) => queue.id_user !== opponent.id_user,
            );
            this.launch_game(player, opponent, info);
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
      if (!this.users.find((user) => user.id_socket === socket.id)) {
        this.addUser(id_user, socket.id);
      }
      socket.join(id_user);
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
            this.server
              .to(sender.id_socket)
              .emit('status', { id_user: my_user.id_user, status: 'ONLINE' });
          }
        }
      }
    } catch (error) {
      console.error('Error in connect : ', error);
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
          if (sender.inGame) {
            const game = this.game.find(
              (game) =>
                game.data.socket_opponent === sender.id_socket ||
                game.data.socket_player === sender.id_socket,
            );
            if (game) {
              let player_score: number = 5;
              let opponent_score: number = 0;
              const is_player: boolean =
                game.data.socket_opponent === sender.id_socket ? false : true;
              if (is_player) {
                player_score = 0;
                opponent_score = 5;
              }
              const _id =
                game.data.socket_opponent === sender.id_socket
                  ? game.data.socket_player
                  : game.data.socket_opponent;
              this.server.to(_id).emit('updateScore', {
                player: player_score,
                opponent: opponent_score,
              });
              if (_id === game.data.socket_player)
                this.server
                  .to(game.data.socket_player)
                  .emit('gameOver', { is_me: false });
              else
                this.server
                  .to(game.data.socket_opponent)
                  .emit('gameOver', { is_me: false });
              const check = await this.prisma.match_History.findUnique({
                where: {
                  id_match: game.data.id_match,
                },
              });
              if (!check)
                return;
              const updated = await this.prisma.match_History.update({
                where: {
                  id_match: game.data.id_match,
                },
                data: {
                  player_score: player_score,
                  opponent_score: opponent_score,
                },
              });
              if (!updated) console.error('Failed to update match');
              else {
                await this.removeGame(game.data.id_match);
                this.gameService.putLvlRank(game.data.id_match);
              }
            }
          }
          if (duplicate === 1) {
            const user = await this.prisma.user.updateMany({
              where: { id_user: my_user.id_user },
              data: { status: 'OFFLINE' },
            });
            if (user) {
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
    } catch (error) {
      console.error('Error in disconnect : ', error);
    }
  }

  @SubscribeMessage('newMessage')
  async newMessage(
    @MessageBody() info: infoType,
    @ConnectedSocket() socket: Socket,
  ) {
    try {
      const sender = this.users.find((user) => user.id_socket === socket.id);
      const receiver = this.users.find(
        (user) => user.id_user === info.id_sender,
      );
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
            info.id_sender = sender.id_user;
            info.created_at = message.created_at;
            result.map((user) => {
              if (user) {
                const recv = this.users.find((u) => user.id_user === u.id_user);
                let in_chat: boolean = false;
                if (recv && recv !== undefined) in_chat = recv.inChat;
                this.server.to(user.id_user).emit('receiveMessage', info);
                if (user.id_user !== info.id_sender) {
                  this.server.to(user.id_user).emit('addNotif', {
                    id_user: my_user.id_user,
                    username: my_user.username,
                    avatar: my_user.avatar,
                    is_message: true,
                    in_chat: in_chat,
                    info: info,
                  });
                }
              }
            });
          }
        }
      }
    } catch (error) {
      console.error('Error in newMessage : ', error);
    }
  }

  @SubscribeMessage('joinChannel')
  async joinChannel(
    @MessageBody() id_channel: string,
    @ConnectedSocket() socket: Socket,
  ) {
    try {
      const sender = this.users.find((user) => user.id_socket === socket.id);
      if (sender !== undefined) {
        const channel = await this.prisma.channel.findUnique({
          where: {
            id_channel: id_channel,
          },
          include: { users: true, bannedUsers: true },
        });
        const my_user = await this.prisma.user.findUnique({
          where: {
            id_user: sender.id_user,
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
                id_channel: id_channel,
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
          let us = filtredUsers.map((filtred) => {
            if (
              this.users.filter((user) => {
                filtred.id_user === user.id_user;
              }) !== undefined
            )
              return filtred;
          });
          const result = await Promise.all(us.filter((user) => user));
          result.map((user) => {
            if (user) {
              const recv = this.users.find((u) => user.id_user === u.id_user);
              let in_chat: boolean = false;
              if (recv && recv !== undefined) in_chat = recv.inChat;
              this.server.to(user.id_user).emit('joinedChannel', id_channel);
            }
          });
        }
      }
    } catch (error) {
      console.error('Error in joinChannel : ', error);
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
      console.error('Error in inGame : ', error);
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
            if (sender.inGame) {
              const game = this.game.find(
                (game) =>
                  game.data.socket_opponent === sender.id_socket ||
                  game.data.socket_player === sender.id_socket,
              );
              if (game) {
                let player_score: number = 5;
                let opponent_score: number = 0;
                const is_player: boolean =
                  game.data.socket_opponent === sender.id_socket ? false : true;
                if (is_player) {
                  player_score = 0;
                  opponent_score = 5;
                }
                const _id =
                  game.data.socket_opponent === sender.id_socket
                    ? game.data.socket_player
                    : game.data.socket_opponent;
                this.server.to(_id).emit('updateScore', {
                  player: player_score,
                  opponent: opponent_score,
                });
                if (_id === game.data.socket_player) {
                  this.server
                    .to(game.data.socket_player)
                    .emit('gameOver', { is_me: false });
                  this.server
                    .to(game.data.socket_opponent)
                    .emit('gameOver', { is_me: true });
                } else {
                  this.server
                    .to(game.data.socket_player)
                    .emit('gameOver', { is_me: true });
                  this.server
                    .to(game.data.socket_opponent)
                    .emit('gameOver', { is_me: false });
                }
                const check = await this.prisma.match_History.findUnique({
                  where: {
                    id_match: game.data.id_match,
                  },
                });
                if (!check)
                  return;
                const updated = await this.prisma.match_History.update({
                  where: {
                    id_match: game.data.id_match,
                  },
                  data: {
                    player_score: player_score,
                    opponent_score: opponent_score,
                  },
                });
                if (!updated) console.error('Failed to update match');
                else {
                  await this.removeGame(game.data.id_match);
                  this.gameService.putLvlRank(game.data.id_match);
                }
              }
            }
            const user = await this.prisma.user.updateMany({
              where: { id_user: my_user.id_user },
              data: { status: 'ONLINE' },
            });
            if (user) {
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
      console.error('Error in online : ', error);
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
    } catch (error) {
      console.error('Error in offline : ', error);
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
      console.error('Error in invite : ', error);
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
              this.server.to(sender.id_socket).emit('accepted', {
                info,
                username: otherUser.username,
                avatar: otherUser.avatar,
                level: otherUser.level,
                id_match: game.id_match,
                id_player: game.id_opponent,
                id_opponent: game.id_player,
              });
              this.server.to(receiver.id_socket).emit('accepted', {
                info,
                username: my_user.username,
                avatar: my_user.avatar,
                level: my_user.level,
                id_match: game.id_match,
                id_player: game.id_player,
                id_opponent: game.id_opponent,
              });
              this.addGame(
                game.id_player,
                sender.id_socket,
                game.id_opponent,
                receiver.id_socket,
                game.id_match,
                info.map,
                info.mode,
              );
            }
          } else {
            this.server.to(sender.id_user).emit('canceled', {
              info,
              username: otherUser.username,
              avatar: otherUser.avatar,
              level: otherUser.level,
            });
          }
        }
      }
    } catch (error) {
      console.error('Error in accept : ', error);
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
      console.error('Error in refuse : ', error);
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
      console.error('Error in cancel : ', error);
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
          const friendship = await this.prisma.friendship.findFirst({
            where: {
              OR: [
                {
                  id_user: my_user.id_user,
                  id_friend: otherUser.id_user,
                },
                {
                  id_user: otherUser.id_user,
                  id_friend: my_user.id_user,
                },
              ],
              state: 'PENDING',
            },
          });

          if (friendship) {
            this.server.to(receiver.id_user).emit('addNotif', {
              id_user: my_user.id_user,
              username: my_user.username,
              avatar: my_user.avatar,
              is_message: false,
              in_chat: false,
            });
          }
        }
      }
    } catch (error) {
      console.error('Error in add request : ', error);
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
          const friendship = await this.prisma.friendship.findFirst({
            where: {
              OR: [
                {
                  id_user: my_user.id_user,
                  id_friend: otherUser.id_user,
                },
                {
                  id_user: otherUser.id_user,
                  id_friend: my_user.id_user,
                },
              ],
            },
          });
          if (friendship) {
            this.server.to(receiver.id_user).emit('removeNotif', {
              id_user: my_user.id_user,
              username: my_user.username,
              avatar: my_user.avatar,
              is_message: info.is_message,
            });
          }
        }
      }
    } catch (error) {
      console.error('Error in remove request : ', error);
    }
  }

  @SubscribeMessage('inChat')
  async inChat(@ConnectedSocket() socket: Socket) {
    try {
      const sender = this.users.find((user) => user.id_socket === socket.id);

      if (sender && sender !== undefined) {
        const my_user = await this.prisma.user.findUnique({
          where: {
            id_user: sender.id_user,
          },
        });
        if (my_user) {
          sender.inChat = true;
        }
      }
    } catch (error) {
      console.error('Error in inChat : ', error);
    }
  }

  @SubscribeMessage('outChat')
  async outChat(@ConnectedSocket() socket: Socket) {
    try {
      const sender = this.users.find((user) => user.id_socket === socket.id);

      if (sender && sender !== undefined) {
        const my_user = await this.prisma.user.findUnique({
          where: {
            id_user: sender.id_user,
          },
        });
        if (my_user) {
          sender.inChat = false;
        }
      }
    } catch (error) {
      console.error('Error in outChat : ', error);
    }
  }

  // ---------------- adam start here ----------------------

  hitTop(game: gameData, half: number) {
    return (
      game.ball.y - game.ball.radius <= game.opponent.y + 15 &&
      game.ball.y - game.ball.radius >= game.opponent.y - 3 &&
      game.ball.x >= game.opponent.x - half &&
      game.ball.x <= game.opponent.x + half &&
      game.ball.dy < 0
    );
  }

  hitBottom(game: gameData, half: number) {
    return (
      game.ball.y + game.ball.radius >= game.player.y - 15 &&
      game.ball.y + game.ball.radius <= game.player.y + 3 &&
      game.ball.x >= game.player.x - half &&
      game.ball.x <= game.player.x + half &&
      game.ball.dy > 0
    );
  }

  bounceBottom(game: gameData, dxi: number, dyi: number, half: number) {
    const oneFifth = game.player.width / 5;
    const oneSixth = game.player.width / 6;

    if (game.ball.x >= game.player.x - half &&
      game.ball.x <= game.player.x - half + oneFifth) {
      game.ball.dx = -dxi -2;
      game.ball.dy = dyi + 2;
    }
    else if (game.ball.x <= game.player.x + half &&
      game.ball.x >= game.player.x + half - oneFifth) {
      game.ball.dx = dxi + 2;
      game.ball.dy = dyi + 2;
    }
    else if (game.ball.x <= game.player.x + oneSixth && game.ball.x >= game.player.x - oneSixth)
      game.ball.dx = 0;
    else if (game.ball.x >= game.player.x)
      game.ball.dx = dxi;
    else if (game.ball.x <= game.player.x)
      game.ball.dx = -dxi;
    game.ball.dy *= -1
  };

  bounceTop(game: gameData, dxi: number, dyi: number, half: number) {
    const oneFifth = game.player.width / 5;
    const oneSixth = game.player.width / 6;

    if (game.ball.x >= game.opponent.x - half &&
      game.ball.x <= game.opponent.x - half + oneFifth) {
        game.ball.dx = -dxi - 2;
        game.ball.dy = -dyi - 2;
    }
    else if (game.ball.x <= game.opponent.x + half &&
            game.ball.x >= game.opponent.x + half - oneFifth) {
              game.ball.dx = dxi + 2
              game.ball.dy = -dyi - 2
            }
    else if (game.ball.x <= game.opponent.x + oneSixth && game.ball.x >= game.opponent.x - oneSixth)
      game.ball.dx = 0;
    else if (game.ball.x <= game.opponent.x)
      game.ball.dx = -dxi;
    else if (game.ball.x >= game.opponent.x)
      game.ball.dx = dxi;
    game.ball.dy *= -1
    }

  handleHits(game: gameData, dxi: number, dyi: number): boolean {
    const half = game.player.width / 2;;
    if (
      game.ball.x + game.ball.radius >= game.fieald.width - 10 ||
      game.ball.x - game.ball.radius <= 10
    )
      return (game.ball.dx = -game.ball.dx), true;
    if (this.hitBottom(game, half))
      return this.bounceBottom(game, dxi, dyi, half), true;
    if (this.hitTop(game, half))
      return this.bounceTop(game, dxi, dyi, half), true;
    return false;
  }

  renderBall(game: gameData) {
    game.ball.x += game.ball.dx;
    game.ball.y += game.ball.dy;
    this.server
      .to(game.data.socket_player)
      .emit('renderBall', game.ball, game.player.x);
    const fakeBall = {
      x: game.fieald.width - game.ball.x,
      y: game.fieald.height - game.ball.y,
    };
    this.server
      .to(game.data.socket_opponent)
      .emit('renderBall', fakeBall, game.opponent.x);
  }

  updatePaddle(player: boolean, game: gameData, dto: renderDto) {
    if (player) {
      game.player.x = dto.paddleX;
      this.server.to(game.data.socket_player).emit('renderPaddle', game.player);
      this.server.to(game.data.socket_opponent).emit('renderOpponent', {
        x: game.fieald.width - game.player.x,
        y: game.opponent.y,
      });
    } else {
      game.opponent.x = game.fieald.width - dto.paddleX;
      this.server
        .to(game.data.socket_opponent)
        .emit('renderPaddle', { x: dto.paddleX, y: game.opponent.y });
      this.server
        .to(game.data.socket_player)
        .emit('renderOpponent', { x: game.opponent.x, y: game.opponent.y });
    }
  }

  centerBall(game: gameData, dxi: number, dyi: number) {
    const signdy = game.ball.dy < 0 ? 1 : -1
    const signdx = game.ball.dx < 0 ? 1 : -1
    
    game.ball.pause = 30;

    game.ball.y = game.fieald.height / 2;
    game.ball.x = game.fieald.width / 2;
    
    game.ball.dx = dxi * signdx;
    game.ball.dy = dyi * signdy;
  }

  checkGoal(game: gameData, dxi: number, dyi: number): boolean {
    if (
      game.ball.y - game.ball.radius <= 0 ||
      game.ball.y + game.ball.radius >= game.fieald.height
    ) {
      if (game.ball.y - game.ball.radius <= 0) {
        game.scores.player++;
      } else if (game.ball.y + game.ball.radius >= game.fieald.height) {
        game.scores.opponent++;
      }
      this.centerBall(game, dxi, dyi);

      this.server.to(game.data.socket_player).emit('updateScore', {
        player: game.scores.player,
        opponent: game.scores.opponent,
      });
      this.server.to(game.data.socket_opponent).emit('updateScore', {
        player: game.scores.opponent,
        opponent: game.scores.player,
      });
      return true;
    }
    return false;
  }

  checkEnd(game: gameData): boolean {
    if (game.scores.player === 7 || game.scores.opponent === 7) return true;
    return false;
  }

  private nub: number = 0;
  @SubscribeMessage('updateFrame')
  async updateFrame(
    @ConnectedSocket() socket: Socket,
    @MessageBody() dto: renderDto,
  ) {
    let game = this.game.find((game) => game.data.id_match === dto.id_match);
    if (!game) {
      return;
    }
    const dxi = 2;
    const dyi = 5;

    const player: boolean =
      socket.id === game.data.socket_player ? true : false;
    this.updatePaddle(player, game, dto);
    if (game.ball.pause > -1)
      return game.ball.pause--;
    if (this.checkEnd(game) === false) {
      if (this.handleHits(game, dxi, dyi) === false) this.checkGoal(game, dxi, dyi);
      this.renderBall(game);
    }
    if (this.checkEnd(game) === true) {
      this.centerBall(game, dxi, dyi);
      this.renderBall(game);
      this.server.to(game.data.socket_player).emit('endGame', dto);
      this.server.to(game.data.socket_opponent).emit('endGame', dto);
      game = this.game.find((game) => game.data.id_match === dto.id_match);
      if (game && game !== undefined) {
        await this.removeGame(game.data.id_match);
        try {
          const check = await this.prisma.match_History.findUnique({
            where: {
              id_match: game.data.id_match,
            },
          });
          if (!check)
            return;
          const updated = await this.prisma.match_History.update({
            where: {
              id_match: game.data.id_match,
            },
            data: {
              player_score: game.scores.player,
              opponent_score: game.scores.opponent,
            },
          });
          if (!updated) console.error('Failed to update match');
          this.gameService.putLvlRank(game.data.id_match);
        } catch (error) {
          console.error('Error in endGame : ', error);
        }
      }
    }
  }
  // ---------------- adam end here ----------------------
}
