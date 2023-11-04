import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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
        updated_at: user.updated_at
        // rooms: user.rooms,
        // blocked: user.blocked,
        // channels: user.channels,
      },
    });
    return result;
  }

  //DELETE
  async deleteUsers() {
    const result = await this.prisma.user.deleteMany();
    return result;
  }

  //GET
  async getUsers() {
    const result = await this.prisma.user.findMany();
    return result;
  }
}
