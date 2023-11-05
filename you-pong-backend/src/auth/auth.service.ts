import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

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

    constructor(private prisma: PrismaService, private jwt:JwtService){}

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
            return true;
        // if any sHiT occurs
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('credentials already in use');
            }
            throw(error)
        }
    }
    
    async localSignIn(dto: AuthDto){
        // check if user exists
        const user = await this.prisma.user.findUnique({
            where:{
                email:dto.email
            }
        })
        if (!user)
            throw new ForbiddenException('Email not found in database');
        // check for password
        const cmp = await bcrypt.compare(dto.password, user.hash);
        if (!cmp)
            throw new UnauthorizedException('Uncorrect password');
        // create a jwt;
        const payload = { sub: user.id_user };
        return {access_token: await this.jwt.signAsync(payload, { expiresIn: '10s' })};
    }
    
    ftCallBack(){
        return "allo?"
    }
}
