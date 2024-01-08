import { Injectable } from '@nestjs/common';
import { infoPlayer, map, mode } from './socket.interfaces';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SocketMethodes {
  constructor(protected prisma: PrismaService) {}

  protected in_chat: boolean = false;

  protected users: { id_user: string; id_socket: string; inGame: boolean }[] =
    [];

  protected privateGame: {
    id_game: string;
    id_player: string;
    socket_player: string;
    id_opponent: string;
    map: map;
    mode: mode;
  }[] = [];

  protected classicHard: {
    id_user: string;
    id_socket: string;
  }[] = [];
  protected orangeHard: {
    id_user: string;
    id_socket: string;
  }[] = [];
  protected greenHard: {
    id_user: string;
    id_socket: string;
  }[] = [];
  protected classicEasy: {
    id_user: string;
    id_socket: string;
  }[] = [];
  protected orangeEasy: {
    id_user: string;
    id_socket: string;
  }[] = [];
  protected greenEasy: {
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
}
