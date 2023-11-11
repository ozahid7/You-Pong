import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

    // update username;
    async updateUsername(_id: string, newUser: string){
        const user = await this.finduserById(_id);
        if (user){
            if (await this.finduserByUserName(newUser)) 
                throw new ConflictException('Username already in use');
        }
        else
            throw new NotFoundException(`user with id ${_id} not found`);
        
        await this.prisma.user.update({
                where: {
                    id_user: _id,
                },
                data: {
                    username: newUser,
                },
            });

        return {stats: true}
    }
}
