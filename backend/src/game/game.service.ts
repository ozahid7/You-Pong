import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  //GET MANY
  async getMatchs(id_user: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
      include: { matchs_player: true, matchs_opponent: true },
    });
    if (!user) {
      return {
        message: 'No such user !',
        Object: null,
      };
    }
    const allMatchs = await this.prisma.match_History.findMany({
      where: {
        OR: [{ id_player: user.id_user }, { id_opponent: user.id_user }],
      },
      orderBy: { updated_at: 'desc' },
    });
    if (allMatchs.length === 0) {
      return {
        message: 'No match yet !',
        Object: [],
      };
    }
    const matchs = await Promise.all(
      allMatchs.map((match) => {
        if (id_user === match.id_player) {
          return {
            id_player: match.id_player,
            id_opponent: match.id_opponent,
            player_score: match.player_score,
            opponent_score: match.opponent_score,
            win: match.player_score > match.opponent_score ? true : false,
            updated_at: match.updated_at,
          };
        } else {
          return {
            id_player: match.id_opponent,
            id_opponent: match.id_player,
            player_score: match.opponent_score,
            opponent_score: match.player_score,
            win: match.player_score < match.opponent_score ? true : false,
            updated_at: match.updated_at,
          };
        }
      }),
    );
    const match_history = await Promise.all(
      matchs.map(async (match) => {
        const user = await this.prisma.user.findUnique({
          where: { id_user: match.id_opponent },
        });
        if (user) {
          return {
            username: user.username,
            avatar: user.avatar,
            player_score: match.player_score,
            opponent_score: match.opponent_score,
            win: match.win,
          };
        }
      }),
    );
    const result = await Promise.all(match_history.filter((match) => match));
    if (!result)
      return {
        message: 'There is no matchs !',
        Object: [],
      };
    return {
      message: 'Matchs founded',
      Object: result,
    };
  }
}
