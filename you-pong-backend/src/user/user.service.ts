import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { userDto } from './dto/user.create.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
        jw_token: user.jw_token,
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
  async deleteUser(username: string) {
    const result = await this.prisma.user.delete({
      where: {
        username: username,
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
  async getUser(user: userDto) {
    const result = await this.prisma.user.findUnique({
      where: {
        username: user.username,
      },
    });
    return result;
  }

  //GET MANY
  async getUsers() {
    const result = await this.prisma.user.findMany();
    return result;
  }
}
