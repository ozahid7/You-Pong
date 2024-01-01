import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function achievements() {
  try {
    await prisma.$connect();
    const achievements = [
      {
        id_achievement: '1',
        title: 'Play & Win',
        description:
          'Experience the wonder and excitement of gaming for the first time',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        id_achievement: '2',
        title: 'Level Up',
        description:
          'Congratulations on surpassing the initial challenges and becoming a Level 3',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        id_achievement: '3',
        title: 'Play & win',
        description:
          'Play your first ranked game and prove your skills in the competitive arena',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        id_achievement: '4',
        title: 'Ranked Up',
        description:
          'Congratulations on surpassing the initial challenges and becoming a Pandora',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        id_achievement: '5',
        title: 'Ranked Up',
        description:
          'Congratulations on surpassing the initial challenges and get Freax card',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        id_achievement: '6',
        title: 'Hat Trick',
        description: 'Achieve three victories in a short span of time',
        avatar: 'http://localhost:4000/file/Badge.png',
      },
      {
        id_achievement: '7',
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
