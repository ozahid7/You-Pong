import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindUserService } from './find.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InfoUserService {
  constructor(
    private finduser: FindUserService,
    private prisma: PrismaService,
  ) {}

  async creatAchObj() {
    const ach = await this.prisma.achievement.findMany();
    const objArray: { isOwned: boolean; title: string; description: string }[] =
      [];
    for (const achievemennt of ach) {
      let val = await this.prisma.achievement.findUnique({
        where: {
          id_achievement: achievemennt.id_achievement,
        },
      });
      objArray.push({
        isOwned: val ? true : false,
        title: achievemennt.title,
        description: achievemennt.description,
      });
    }
    return objArray;
  }
  async getHero(_id: string) {
    try {
      const user = await this.finduser.finduserById(_id);
      if (!user) throw new NotFoundException('user not found!');
      return {
        userInfo: {
          uid: user.id_user,
          username: user.username,
          level: user.level,
          rank: user.rank,
          loses: user.defeats,
          wins: user.victory,
          status: user.status,
          tfaStatus: user.tfaIsEnable,
          avatar: user.avatar,
          channels: user.channels,
          achievements: user.achievements,
          isIntra: user.hash === null ? true : false,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
        },
      };
    } catch (error) {
      throw new NotFoundException('user not found');
    }
  }
}
