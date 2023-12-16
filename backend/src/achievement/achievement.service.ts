import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { achCreateDto } from './dto';

@Injectable()
export class AchievementService {
  constructor(private prisma: PrismaService) {}

  //CREATE ACHIEVEMENTS
  async createAchievements(id_user: string) {
    const user = await this.prisma.user.findUnique({
      where: { id_user: id_user },
    });
    if (!user)
      return {
        message: 'No such User !',
        object: null,
      };
    const achievements = [
      {
        title: 'Play & Win',
        description:
          'Experience the wonder and excitement of gaming for the first time',
        avatar: 'http://localhost:4000/file/Badge.png',
        isOwned: false,
        id_user: id_user,
      },
      {
        title: 'New Experience',
        description:
          'Play your first ranked game and prove your skills in the competitive arena',
        avatar: 'http://localhost:4000/file/Badge.png',
        isOwned: false,
        id_user: id_user,
      },
      {
        title: 'Play & Win',
        description:
          'Achieve your first victory by eliminating an opponent in your first game',
        avatar: 'http://localhost:4000/file/Badge.png',
        isOwned: false,
        id_user: id_user,
      },
      {
        title: 'Hat Trick',
        description: 'Achieve three victories in a short span of time',
        avatar: 'http://localhost:4000/file/Badge.png',
        isOwned: false,
        id_user: id_user,
      },
      {
        title: 'Level Up',
        description:
          'Congratulations on surpassing the initial challenges and becoming a seasoned adventurer!',
        avatar: 'http://localhost:4000/file/Badge.png',
        isOwned: false,
        id_user: id_user,
      },
      {
        title: 'Speed Demon',
        description: 'Win a game challenge within a specified time limit',
        avatar: 'http://localhost:4000/file/Badge.png',
        isOwned: false,
        id_user: id_user,
      },
    ];
    const result = await this.prisma.achievement.createMany({
      data: achievements,
    });
    if (!result)
      return {
        message: "Can't create achievements !",
        object: null,
      };
    return {
      message: 'Achievements Created Succefully',
      object: result,
    };
  }

  //   async setAchievement(dto: achCreateDto) {
  //     try {
  //       await this.prisma.achievement.create({
  //         data: {
  //           avatar: dto.avatar,
  //           title: dto.title,
  //           description: dto.description,
  //           requirement: dto.requirement,
  //         },
  //       });
  //       return true;
  //     } catch (error) {
  //       throw new ForbiddenException('Failed to create achievement.');
  //     }
  //   }

  //   async findAch(_title: string) {
  //     try {
  //       const ach = await this.prisma.achievement.findUnique({
  //         where: {
  //           title: _title,
  //         },
  //       });
  //       return ach;
  //     } catch (error) {
  //       throw new NotFoundException('achievement not found');
  //     }
  //   }
}
