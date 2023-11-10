import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    *generateUser(usename: string): Generator<string> {
        id: Number = 0;

    }

    constructor(private prisma: PrismaService) {}

    private userCounter: number = 0


    async finduserById(id: string){
        const user = await this.prisma.user.findUnique({
            where:{
                id_user: id
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
                    username: obj.username,
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
    async updateUsername(id: string, newUser){
        const user = await this.finduserById(id);
        if (user){
            if (await this.finduserByUserName(newUser)) {
                throw new ConflictException('Username already exists');
            }
        }
        else {
            throw new Error(`user with id ${id} not found`);   
        }
        this.prisma.user.update({
            where: {
                id_user: id
            },
            data: {
                username: newUser
            }
        })
        return true;
    }
}
