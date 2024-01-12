import { Injectable } from '@nestjs/common';
import { gameData, map, mode } from './socket.interfaces';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SocketMethodes {
  constructor(protected prisma: PrismaService) {}

  protected users: {
    id_user: string;
    id_socket: string;
    inGame: boolean;
    inChat: boolean;
  }[] = [];

  protected game: gameData[] = [];

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

  // add the game
  async addGame(
    id_player: string,
    socket_player: string,
    id_opponent: string,
    socket_opponent: string,
    id_match: string,
    map: map,
    mode: mode,
  ) {
    // mode === 0 (hard) ||  mode === 1(easy)
    let speed = mode === 0 ? 2 : 1;
    let width = mode === 0 ? 100 : 160;
    let radius = mode === 0 ? 7 : 14;
    let dx = mode === 0 ? 5 : 2;
    let dy = mode === 0 ? 5 : 5;

    const ball: {
      x: number;
      y: number;
      speed: number;
      radius: number;
      dx: number;
      dy: number;
    } = {
      x: 300,
      y: 400,
      speed: speed,
      radius: radius,
      dx: 2,
      dy: 2,
    };

    const player: {
      x: number;
      y: number;
      width: number;
    } = {
      x: 300,
      y: 770,
      width,
    };

    const opponent: {
      x: number;
      y: number;
      width: number;
    } = {
      x: 300,
      y: 30,
      width: width,
    };

    const scores: {
      player: number;
      opponent: number;
    } = {
      player: 0,
      opponent: 0,
    };

    const fieald: {
      width: number;
      height: number;
    } = { width: 600, height: 800 };

    const data: {
      id_match: string;
      id_player: string;
      socket_player: string;
      socket_opponent: string;
      id_opponent: string;
      map: map;
      mode: mode;
    } = {
      id_match,
      id_player,
      socket_player,
      socket_opponent,
      id_opponent,
      map,
      mode,
    };

    this.game.push({ player, opponent, data, scores, ball, fieald });
  }

  // remove the game
  async removeGame(id_match: string) {
    this.game = this.game.filter((game) => game.data.id_match !== id_match);
  }

  async addUser(id_user: string, id_socket: string) {
    this.users.push({ id_user, id_socket, inGame: false, inChat: false });
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
