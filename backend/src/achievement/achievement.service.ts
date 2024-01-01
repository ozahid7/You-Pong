import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AchievementService {
  constructor(
    private prisma: PrismaService,
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
}
