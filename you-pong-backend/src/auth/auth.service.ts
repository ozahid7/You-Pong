import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService 
{
    generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
    
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
    
        return result;
    }

    constructor(private prisma: PrismaService){}
    async localSignUp(dto: AuthDto){
        // create hashed password;
        const   salt = await bcrypt.genSalt();
        const   hash = await bcrypt.hash(dto.password, salt);
        // create new user
        try{
            const newUser = await this.prisma.user.create({
                data:
                {
                    username: this.generateRandomString(10),
                    email: dto.email,
                    hash
                }
            })
            return {new_user: newUser};
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('Email is already in use');
            }
            throw(error)
        }
    }
}