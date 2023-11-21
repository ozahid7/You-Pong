import {  ForbiddenException, Injectable, NotFoundException, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { userDto } from './dto/user.create.dto';
import { Response } from 'express';

@Injectable()
export class UserService {
  
  private id:number = 157;

  async generateUser(usename: string):  Promise<string> {
      let res:string = usename + (this.id).toString().padStart(3, '0');
      if ((await this.finduserByUserName(res) == null)){
          return res;
      }
      this.id++;
      return await this.generateUser(usename);
  }

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
  
    private userCounter: number = 0


    async finduserById(_id: string){
        const user = await this.prisma.user.findUnique({
            where:{
                id_user: _id
            }
        });
        return user
    }

    async finduserByUserName(_username: string){
        const user = await this.prisma.user.findUnique({
            where:{
                username: _username
            }
        });
        return user
    }
    
    async finduserByEmail(_email: string){
        const user = await this.prisma.user.findUnique({
            where:{
                email: _email
            }
        });
        return user
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

    async getTfaStatus(user: any){
    	try {
    	  return (await user).tfaIsEnable;
    	} catch (error) {
    	  throw new NotFoundException(error)
    	}
    }

    async switchTfaStatus(_id: string) {
      const user = this.finduserById(_id);  
      try{
            await this.prisma.user.update({
                where: {
                    id_user: _id,
                },
                data: {
                    tfaIsEnable: !(await this.getTfaStatus(user)),
                },
            }
			);
            
		} catch(error){
          throw new ForbiddenException(error);
        }
        return (await user).tfaIsEnable;
    }

    async setTfaSecret(secret: string, _id: string) {
      try {
          await this.prisma.user.update({
              where: {
                  id_user: _id,
              },
              data: {
                  two_fact_auth: secret,
              },
          });
      } catch (error){
          throw new ForbiddenException(error);
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
}
