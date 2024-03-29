import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  //GET MANY
  async getMatchs(id_user: string, _id: string) {
    const my_user = await this.prisma.user.findUnique({
      where: { id_user: _id },
      include: {
        matchs_player: true,
        matchs_opponent: true,
      },
    });
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
      include: {
        matchs_player: true,
        matchs_opponent: true,
      },
    });
    if (!user || !my_user) {
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
          include: { blocked_from: true, blocked_user: true },
        });
        let is_blocked: boolean = false;
        if (user) {
          if (
            user.blocked_from.find((block) => id_user === block.id_user) !==
              undefined ||
            user.blocked_user.find((block) => id_user === block.id_user) !==
              undefined ||
            user.blocked_from.find((block) => _id === block.id_user) !==
              undefined ||
            user.blocked_user.find((block) => _id === block.id_user) !==
              undefined
          ) {
            is_blocked = true;
          }
          return {
            uid: user.id_user,
            username: user.username,
            avatar: user.avatar,
            status: user.status,
            player_score: match.player_score,
            opponent_score: match.opponent_score,
            win: match.win,
            is_blocked: is_blocked,
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

  //PUT
  async putAchievements(id_user: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id_user: id_user },
        include: {
          achievements: true,
          matchs_player: true,
          matchs_opponent: true,
        },
      });
      if (!user)
        return {
          message: 'No such User !',
          Object: null,
        };
      const achievements = await this.prisma.achievement.findMany({
        include: { users: true },
      });
      if (!achievements)
        return {
          message: 'No such Achievements !',
          Object: null,
        };

      // Play & win
      if (
        user.victory > 0 &&
        user.achievements.find((achiev) => achiev.id_achievement === '1') ===
          undefined
      ) {
        await this.prisma.achievement.update({
          where: { id_achievement: '1' },
          data: {
            users: { connect: { id_user: user.id_user } },
          },
        });
      }

      // Level up
      if (
        user.level > 3 &&
        user.achievements.find((achiev) => achiev.id_achievement === '2') ===
          undefined
      ) {
        await this.prisma.achievement.update({
          where: { id_achievement: '2' },
          data: {
            users: { connect: { id_user: user.id_user } },
          },
        });
      }

      // FirstServe
      if (
        (user.matchs_opponent.length > 0 || user.matchs_player.length > 0) &&
        user.achievements.find((achiev) => achiev.id_achievement === '3') ===
          undefined
      ) {
        await this.prisma.achievement.update({
          where: { id_achievement: '3' },
          data: {
            users: { connect: { id_user: user.id_user } },
          },
        });
      }

      // Runked Up
      if (
        user.rank === 'PANDORA' &&
        user.achievements.find((achiev) => achiev.id_achievement === '4') ===
          undefined
      ) {
        await this.prisma.achievement.update({
          where: { id_achievement: '4' },
          data: {
            users: { connect: { id_user: user.id_user } },
          },
        });
      }

      // Cleansheet
      const matchs = (await this.getMatchs(id_user, id_user)).Object;
      let someMatches: typeof matchs = null;
      if (matchs.length !== 0) someMatches = matchs.slice(0, 1);
      if (
        someMatches &&
        someMatches.some(
          (match) => match.win === true && match.opponent_score === 0
        ) &&
        user.achievements.find((achiev) => achiev.id_achievement === '5') ===
          undefined
      ) {
        await this.prisma.achievement.update({
          where: { id_achievement: '5' },
          data: {
            users: { connect: { id_user: user.id_user } },
          },
        });
      }

      // Hat Trick
      if (matchs.length !== 0) someMatches = matchs.slice(0, 3);
      if (
        someMatches &&
        someMatches.length === 3 &&
        someMatches.some((match) => match.win === false) === false &&
        user.achievements.find((achiev) => achiev.id_achievement === '6') ===
          undefined
      ) {
        await this.prisma.achievement.update({
          where: { id_achievement: '6' },
          data: {
            users: { connect: { id_user: user.id_user } },
          },
        });
      }

      // Level up
      if (
        user.level >= 10 &&
        user.achievements.find((achiev) => achiev.id_achievement === '7') ===
          undefined
      ) {
        await this.prisma.achievement.update({
          where: { id_achievement: '7' },
          data: {
            users: { connect: { id_user: user.id_user } },
          },
        });
      }
    } catch (error) {
      console.error('error in put achievement: ', error);
    }
  }

  //PUT RANK
  async putRank(id_user: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id_user: id_user },
      });
      if (!user) {
        console.error('No such user !');
      }
      let xp: number = user.victory - user.defeats;
      let your_rank = user.rank;
      if (xp < 5) your_rank = 'BIOS';
      else if (xp > 4 && xp < 10) your_rank = 'FREAX';
      else if (xp > 9 && xp < 16) your_rank = 'COMMODORE';
      else if (xp > 15) your_rank = 'PANDORA';

      if (your_rank !== user.rank) {
        const update = await this.prisma.user.update({
          where: { id_user: id_user },
          data: { rank: your_rank },
        });
        if (!update) console.error("Can't update user rank !");
      }
    } catch (error) {
      console.error('error in put rank: ', error);
    }
  }

  //PUT LEVEL & RANK
  async putLvlRank(id_match: string) {
    try {
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
            level: player.level + 0.4,
          },
        });
        const updateOpponent = await this.prisma.user.update({
          where: { id_user: opponent.id_user },
          data: {
            defeats: opponent.defeats + 1,
          },
        });
        if (!updatePlayer || !updateOpponent)
          console.error("Can't update user victory / level !");
      } else {
        const updatePlayer = await this.prisma.user.update({
          where: { id_user: player.id_user },
          data: {
            defeats: player.defeats + 1,
          },
        });
        const updateOpponent = await this.prisma.user.update({
          where: { id_user: opponent.id_user },
          data: {
            victory: opponent.victory + 1,
            level: opponent.level + 0.4,
          },
        });
        if (!updatePlayer || !updateOpponent)
          console.error("Can't update user victory / level !");
      }
      this.putRank(player.id_user);
      this.putRank(opponent.id_user);
      this.putAchievements(player.id_user);
      this.putAchievements(opponent.id_user);
    } catch (error) {
      console.error('error in put level rank : ', error);
    }
  }
}
