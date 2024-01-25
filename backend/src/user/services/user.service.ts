import { ForbiddenException, Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';
import { FindUserService } from './find.service';
import { use } from 'passport';

export enum relation {
  PENDING,
  ACCEPTED,
  NONE,
}

@Injectable()
export class UserService {
  private id: number = 157;

  async generateUser(usename: string): Promise<string> {
    let res: string = usename + this.id.toString().padStart(3, '0');
    if ((await this.findService.finduserByUserName(res)) == null) {
      return res;
    }
    this.id++;
    return await this.generateUser(usename);
  }

  constructor(
    private prisma: PrismaService,
    private findService: FindUserService,
  ) {}

  // create a user
  async create(obj: any) {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          username: await this.generateUser(obj.username),
          email: obj.email,
          hash: obj.hash,
          lastname: obj.familyName,
          firstname: obj.givenName,
          avatar: obj.avatar,
        },
      });
      return newUser;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email Already in use');
      }
      throw error;
    }
  }

  async signout(@Res() res: Response) {
    try {
      res.clearCookie('access_token');
      res.clearCookie('_intra_42_session_production');
      res.status(200).json({});
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async findUser(friend: string, id_user: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: friend,
      },
      include: {
        friendship_friend: true,
        friendship_user: true,
        channels: true,
        achievements: true,
        blocked_from: true,
        blocked_user: true,
        matchs_opponent: true,
        matchs_player: true,
      },
    });

    if (!user) throw new ForbiddenException('Username not Found!');
    let user_relation: relation = relation.NONE;
    if (
      id_user &&
      user &&
      (user.friendship_friend.find(
        (user) => user.id_user === id_user && user.state === 'PENDING',
      ) ||
        user.friendship_user.find(
          (user) => user.id_friend === id_user && user.state === 'PENDING',
        ))
    )
      user_relation = relation.PENDING;
    else if (
      id_user &&
      user &&
      (user.friendship_friend.find(
        (user) => user.id_user === id_user && user.state === 'ACCEPTED',
      ) ||
        user.friendship_user.find(
          (user) => user.id_friend === id_user && user.state === 'ACCEPTED',
        ))
    )
      user_relation = relation.ACCEPTED;

    const blockedFrom = user.blocked_from.find(
      (element) => element.id_user === id_user,
    );
    const blocked = user.blocked_user.find(
      (element) => element.id_user === id_user,
    );
    if (blocked !== undefined || blockedFrom !== undefined) return null;

    return {
      avatar: user.avatar,
      username: user.username,
      level: user.level,
      rank: user.rank,
      wins: user.victory,
      loses: user.defeats,
      uid: user.id_user,
      status: user.status,
      channels: user.channels,
      isIntra: user.hash === null ? true : false,
      matchs_opponent: user.matchs_opponent,
      matchs_player: user.matchs_player,
      achievements: user.achievements,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      user_relation: user_relation,
    };
  }

  //GET
  async getUserChannels(id_user: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id_user: id_user,
      },
      include: { channels: true },
    });
    if (!user)
      return {
        message: 'No such user !',
        Object: { direct: null, groups: null },
      };
    let groups = null;
    let direct = null;

    const groupsChannels = user.channels.map((channel) => {
      if (channel.type !== 'DIRECT') return channel;
    });
    groups = groupsChannels.filter((channel) => channel);

    const directChannels = user.channels.map((channel) => {
      if (channel.type === 'DIRECT') return channel;
    });
    direct = directChannels.filter((channel) => channel);

    if (!groups || groups === undefined || groups.length === 0) groups = null;
    if (!direct || direct === undefined || direct.length === 0) direct = null;
    return {
      message: 'Channels found',
      Object: { direct, groups },
    };
  }
}
