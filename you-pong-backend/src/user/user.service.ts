import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    private userCounter: number = -1;

    generateUser(): string {
        this.userCounter++;
        return "YouPong" + this.userCounter.toString().padStart(3, '0'); ;
    }

    constructor(private prisma: PrismaService) {}
    
    // create a user
    async create(obj: any){
        try {
            const newUser = await this.prisma.user.create({
                data:
                {
                    username: this.generateUser(),
                    email: obj.email,
                    hash: obj.hash,
                    
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
}
