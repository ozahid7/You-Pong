import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  Res,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';
import { userDto } from '../dto/user.create.dto';
import { FindUserService } from './find.service';
import { error } from 'console';
import { AchievementService } from 'src/achievement/achievement.service';

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

  //POST
  async postUser(user: userDto) {
    const result = await this.prisma.user.create({
      data: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        avatar: user.avatar,
        hash: user.hash,
        email: user.email,
        two_fact_auth: user.two_fact_auth,
        victory: user.victory,
        defeats: user.defeats,
        level: user.level,
        rank: user.rank,
        status: user.status,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    });
    return result;
  }

  //POST MANY
  async postUsers(users: userDto[]) {
    const data = users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      avatar: user.avatar,
      hash: user.hash,
      email: user.email,
      two_fact_auth: user.two_fact_auth,
      jw_token: user.jw_token,
      victory: user.victory,
      defeats: user.defeats,
      level: user.level,
      rank: user.rank,
      status: user.status,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }));
    const result = await this.prisma.user.createMany({
      data,
      skipDuplicates: true,
    });
    const resultCount = result.count;
    const duplicate = data.length - resultCount;
    if (duplicate > 0) {
      return {
        message: 'Duplicates found',
        count: duplicate,
      };
    }

    return { message: 'Users created successfully' };
  }

  //DELETE
  async deleteUser(id_user: string) {
    const result = await this.prisma.user.delete({
      where: {
        id_user: id_user,
      },
    });
    return result;
  }

  //DELETE MANY
  async deleteUsers() {
    const result = await this.prisma.user.deleteMany();
    return result;
  }

  //GET

  //GET MANY
  async getUsers() {
    const result = await this.prisma.user.findMany();
    return result;
  }
  // create a user
  async create(obj: any) {
    try {
      const users = await this.prisma.user.findMany();
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
      res.status(200).json({});
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async findUser(friend: string, id_user: string) {
    // const user = await this.findService.finduserByUserName(friend);
    // find user by username if not blocked or not blocked by user
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

    if (!user) throw new ServiceUnavailableException('Username not Found!');

    await user.blocked_from.forEach((element) => {
      if (element.id_user === id_user) {
        throw new ForbiddenException('Username not Found!');
      }
    });
    await user.blocked_user.forEach((element) => {
      if (element.id_user === id_user) {
        throw new ForbiddenException('Username not Found!');
      }
    });

    return {
      avatar: (await user).avatar,
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
    return (await this.findService.finduserById(id_user)).channels;
  }
}
