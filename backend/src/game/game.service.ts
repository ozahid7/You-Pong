import { Injectable } from '@nestjs/common';
import { AchievementService } from 'src/achievement/achievement.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameService {
  constructor(
    private prisma: PrismaService,
    private achievement: AchievementService,
  ) {}

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
            uid: user.id_user,
            username: user.username,
            avatar: user.avatar,
            status: user.status,
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

  //PUT RANK
  async putRank(id_user: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
    });
    if (!user) {
      console.error('No such user !');
    }
    let xp: number = user.victory - user.defeats;
    let your_rank = user.rank;
    if (xp < 4) your_rank = 'BIOS';
    else if (xp > 3 && xp < 6) your_rank = 'FREAX';
    else if (xp > 5 && xp < 9) your_rank = 'COMMODORE';
    else if (xp > 8) your_rank = 'PANDORA';

    if (your_rank !== user.rank) {
      const update = await this.prisma.user.update({
        where: { id_user: id_user },
        data: { rank: your_rank },
      });
      if (!update) console.error("Can't update user rank !");
    }
  }

  //PUT LEVEL & RANK
  async putLvlRank(id_match: string) {
    const match = await this.prisma.match_History.findUnique({
      where: { id_match: id_match },
    });
    if (!match) {
      console.error('No such match !');
    }
    const player = await this.prisma.user.findUnique({
      where: { id_user: match.id_player },
    });
    const opponent = await this.prisma.user.findUnique({
      where: { id_user: match.id_opponent },
    });
    if (!player || !opponent) {
      console.error('No such user !');
    }

    if (match.player_score > match.opponent_score) {
      const updatePlayer = await this.prisma.user.update({
        where: { id_user: player.id_user },
        data: {
          victory: player.victory + 1,
          level: player.level + 0.45,
        },
      });
      const updateOpponent = await this.prisma.user.update({
        where: { id_user: opponent.id_user },
        data: {
          victory: opponent.defeats + 1,
          level: opponent.level + 0.15,
        },
      });
      if (!updatePlayer || !updateOpponent)
        console.error("Can't update user victory / level !");
    } else {
      const updatePlayer = await this.prisma.user.update({
        where: { id_user: player.id_user },
        data: {
          victory: player.defeats + 1,
          level: player.level + 0.15,
        },
      });
      const updateOpponent = await this.prisma.user.update({
        where: { id_user: opponent.id_user },
        data: {
          victory: opponent.victory + 1,
          level: opponent.level + 0.45,
        },
      });
      if (!updatePlayer || !updateOpponent)
        console.error("Can't update user victory / level !");
    }
    this.putRank(player.id_user);
    this.putRank(opponent.id_user);
    this.achievement.putAchievements(player.id_user);
    this.achievement.putAchievements(opponent.id_user);
  }
}
