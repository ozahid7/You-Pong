import {  ForbiddenException, Injectable, NotAcceptableException, NotFoundException, Res, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';
import { userDto } from '../dto/user.create.dto';
import { FindUserService } from './find.service';
import { error } from 'console';

@Injectable()
export class UserService {
  
  private id:number = 157;

  async generateUser(usename: string):  Promise<string> {
      let res:string = usename + (this.id).toString().padStart(3, '0');
      if ((await this.findService.finduserByUserName(res) == null)){
          return res;
      }
      this.id++;
      return await this.generateUser(usename);
  }

  constructor(private prisma: PrismaService,
              private findService: FindUserService) {}

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
    // create a user
    async create(obj: any){
        try {
            const newUser = await this.prisma.user.create({
                data:
                {
                    username: await this.generateUser(obj.username),
                    email: obj.email,
                    hash: obj.hash,
                    lastname: obj.familyName,
                    firstname: obj.givenName,
                    avatar: obj.avatar
                }
            })
            return newUser;
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('Email Already in use');
            }
            throw(error)
        }
    }

    async signout(@Res() res: Response){
    	try {
			res.clearCookie('access_token');
			res.status(200).json({})
    	} catch(error) {
			  throw new ForbiddenException(error);
    	}
	}

  async findUser(friend: string) {
    const user = await this.findService.finduserByUserName(friend);
		if (!user)
			throw new ServiceUnavailableException("Username not Found!");
    return {
      avatar: (await user).avatar,
      username: user.username,
      level: user.level,
      rank: user.rank,
      wins: user.victory,
      losts: user.defeats,
      status: user.status,
    };
  }

  async updateUsername(userId: string, newName: string) {
    try {
      const user = await this.findService.finduserById(userId);
      const pot = await this.prisma.user.findFirst({
        where: {
          username: newName,
        }
      })
      if (pot)
        throw new NotAcceptableException("username already in use!");
      await this.prisma.user.update({
        where: {
          username: (await user).username,
        },
        data: {
          username: newName,
        }
      });
      } catch (error) {
        throw new NotAcceptableException("username already in use!"); 
      }
  }
}
