import { ApiGatewayTimeoutResponse } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function firstRun() {
  try {
    await prisma.$connect();
    const achievements = [
      {
        id_achievement: '1',
        title: 'Play & Win',
        description: 'Achieve your first win in the game',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        id_achievement: '2',
        title: 'Level Up',
        description:
          'Congratulations on surpassing the initial challenges and becoming a Level 4',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        id_achievement: '3',
        title: 'FirstServe',
        description:
          'Experience the wonder and excitement of gaming for the first time',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        id_achievement: '4',
        title: 'Ranked Up',
        description:
          'Congratulations on your impressive feat of ascending to the PANDORA rank !',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        id_achievement: '5',
        title: 'Cleansheet',
        description:
          'Congratulations on maintaining a cleansheet in your last game!',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        id_achievement: '6',
        title: 'Hat Trick',
        description: 'Win Three Consecutive Games',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        id_achievement: '7',
        title: 'Level Up',
        description:
          'Congratulations on surpassing the initial challenges and becoming a Level 10',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
    ];
    const result = await prisma.achievement.createMany({
      data: achievements,
      skipDuplicates: true,
    });
    const users = await prisma.user.updateMany({
      data:{status: 'OFFLINE'}
    })
  } catch (error) {
    throw new Error(`Failed to create Achievements : ${error}`);
  } finally {
    await prisma.$disconnect();
  }
}

firstRun();
