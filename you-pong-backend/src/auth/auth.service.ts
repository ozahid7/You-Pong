import { ForbiddenException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { localDto } from './dto';
import { Response } from 'express';

@Injectable()
export class AuthService 
{
    constructor(private prisma: PrismaService, private jwt:JwtService, private user: UserService){}


    async genToken(id: string) {
        const payload = { sub: id };
        return  await this.jwt.signAsync(payload, { expiresIn: '2h' });
    }

    async localSignUp(dto: localDto) {
        // create hashed password;
        const   salt = await bcrypt.genSalt();
        const   hash = await bcrypt.hash(dto.password, salt);
        // create new user
        return this.user.create({
            email: dto.email,
            hash,
            username: "You-Pong"
        });
    }

    async localSignIn(dto: localDto) {
        const user = await this.user.finduserByEmail(dto.email)
        if (!user)
            throw new ForbiddenException('Email not found in database');
        // check for password
        const cmp = await bcrypt.compare(dto.password, user.hash);
        if (!cmp)
            throw new UnauthorizedException('Uncorrect password');
        // create a jwt;
        // return this.genToken(user.id_user);
        return true
    }
}
