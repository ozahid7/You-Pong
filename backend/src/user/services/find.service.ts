import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindUserService {
  constructor(private prisma: PrismaService) {}
  async finduserById(_id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: _id,
      },
      include: {
        friendship_friend: true,
        friendship_user: true,
        channels: true,
        achievements: true,
        matchs_opponent: true,
        matchs_player: true,
      },
    });
    return user;
  }

  async finduserByUserName(_username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: _username,
      },
      include: {
        friendship_friend: true,
        friendship_user: true,
        channels: true,
        achievements: true,
        matchs_opponent: true,
        matchs_player: true,
      },
    });
    return user;
  }

  async finduserByEmail(_email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: _email,
      },
      include: {
        friendship_friend: true,
        friendship_user: true,
        channels: true,
      },
    });
    return user;
  }
}
