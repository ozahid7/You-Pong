import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function achievements() {
  try {
    await prisma.$connect();
    const achievements = [
      {
        title: 'Play your first',
        description:
          'Experience the wonder and excitement of gaming for the first time',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        title: 'Play ranked game',
        description:
          'Play your first ranked game and prove your skills in the competitive arena',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        title: 'Win your first game',
        description:
          'Achieve your first victory by eliminating an opponent in your first game',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        title: 'Hat Trick Hero',
        description: 'Achieve three victories in a short span of time',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        title: 'Reach level 5',
        description:
          'Congratulations on surpassing the initial challenges and becoming a seasoned adventurer!',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        title: 'Speed Demon',
        description: 'Win a game challenge within a specified time limit',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
    ];
    const result = await prisma.achievement.createMany({
      data: achievements,
      skipDuplicates: true,
    });
  } catch (error) {
    throw new Error(`Failed to create Achievements : ${error}`);
  } finally {
    await prisma.$disconnect();
  }
}
achievements();
