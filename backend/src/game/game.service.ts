import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  //GET MANY
  async getMatchs(id_user: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
      include: { matchs_player: true, matchs_oppenent: true },
    });
    if (!user) {
      return {
        message: 'No such user !',
        object: null,
      };
    }
    const allMatchs = await this.prisma.match_History.findMany({
      where: {
        OR: [{ id_player: user.id_user }, { id_oppenent: user.id_user }],
      },
      orderBy: { updated_at: 'desc' },
    });
    if (allMatchs.length === 0) {
      return {
        message: 'No match yet !',
        object: null,
      };
    }
    const matchs = await Promise.all(
      allMatchs.map((match) => {
        if (id_user === match.id_player) {
          return {
            id_player: match.id_player,
            id_oppenent: match.id_oppenent,
            player_score: match.player_score,
            oppenent_score: match.oppenent_score,
            win: match.player_score > match.oppenent_score ? true : false,
            updated_at: match.updated_at,
          };
        } else {
          return {
            id_player: match.id_oppenent,
            id_oppenent: match.id_player,
            player_score: match.oppenent_score,
            oppenent_score: match.player_score,
            win: match.player_score < match.oppenent_score ? true : false,
            updated_at: match.updated_at,
          };
        }
      }),
    );
    const match_history = await Promise.all(
      matchs.map(async (match) => {
        const user = await this.prisma.user.findUnique({
          where: { id_user: match.id_oppenent },
        });
        if (user) {
          return {
            username: user.username,
            avatar: user.avatar,
            player_score: match.player_score,
            oppenent_score: match.oppenent_score,
            win: match.win,
          };
        }
      }),
    );
    const result = await Promise.all(match_history.filter((match) => match));
    if (!result)
      return {
        message: 'There is no matchs !',
        Object: null,
      };
    return {
      message: 'Matchs founded',
      Object: result,
    };
  }
}
