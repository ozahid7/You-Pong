import { Injectable } from '@nestjs/common';
import { GameService } from 'src/game/game.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AchievementService {
  constructor(
    private prisma: PrismaService,
    private game: GameService,
  ) {}

  //GET MANY
  async getAchievements(id_user: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
    });
    if (!user)
      return {
        message: 'No such User !',
        Object: null,
      };
    const achievements = await this.prisma.achievement.findMany({
      include: { users: true },
      orderBy: { updated_at: 'desc' },
    });
    if (!achievements)
      return {
        message: 'No such Achievements !',
        Object: null,
      };
    const result = await Promise.all(
      achievements.map((achievement) => {
        if (
          achievement.users.filter((user) => user.id_user === id_user)
            .length !== 0
        )
          return { achievement, is_owned: true };
        return { achievement, is_owned: false };
      }),
    );
    if (!result)
      return {
        message: 'Failed to get owned achievements !',
        Object: null,
      };
    return {
      message: 'Achievements founded Successfully !',
      Object: result,
    };
  }

  //PUT
  async putAchievements(id_user: string) {
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
      user.victory >= 1 &&
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
      user.level >= 3 &&
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

    // Play & win
    if (
      (user.matchs_opponent.length >= 1 || user.matchs_player.length >= 1) &&
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
    const matchs = (await this.game.getMatchs(id_user)).Object;
    let someMatches: typeof matchs = null;
    if (matchs.length !== 0) someMatches = matchs.slice(0, 1);
    if (
      someMatches &&
      someMatches.filter(
        (match) => match.win === true && match.opponent_score === 0,
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
      someMatches.filter((match) => match.win === false) !== undefined &&
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
      user.level >= 8 &&
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
  }
}
