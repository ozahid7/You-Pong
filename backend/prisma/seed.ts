import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function achievements() {
  try {
    await prisma.$connect();
    const achievements = [
      {
        title: 'Play & Win',
        description:
          'Experience the wonder and excitement of gaming for the first time',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        title: 'Level Up',
        description:
          'Congratulations on surpassing the initial challenges and becoming a Level 3',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        title: 'Play & win',
        description:
          'Play your first ranked game and prove your skills in the competitive arena',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        title: 'Ranked Up',
        description:
          'Congratulations on surpassing the initial challenges and becoming a Rank 1',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        title: 'Challenge',
        description:
        'Achieve your first victory by eliminating an opponent in your first game',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        title: 'Ranked Up',
        description:
          'Congratulations on surpassing the initial challenges and becoming a Rank 6',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        title: 'Hat Trick',
        description: 'Achieve three victories in a short span of time',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        title: 'Level Up',
        description:
          'Congratulations on surpassing the initial challenges and becoming a Level 8',
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
