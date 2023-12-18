import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AchievementService {
  constructor(private prisma: PrismaService) {}

  //GET MANY
  async getAchievements(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user)
      return {
        message: 'No such User !',
        object: null,
      };
    const achievements = await this.prisma.achievement.findMany({
      include: { users: true },
    });
    if (!achievements)
      return {
        message: 'No such Achievements !',
        object: null,
      };
    const result = await Promise.all(
      achievements.map((achievement) => {
        if (
          achievement.users.filter((user) => user.username === username)
            .length !== 0
        )
          return { achievement, is_owned: true };
        return { achievement, is_owned: false };
      }),
    );
    if (!result)
      return {
        message: 'Failed to get owned achievements !',
        object: null,
      };
    return {
      message: 'Achievements founded Successfully !',
      object: result,
    };
  }
}
