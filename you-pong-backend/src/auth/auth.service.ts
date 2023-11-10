import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService 
{
    constructor(private prisma: PrismaService, private jwt:JwtService, private user: UserService){}


    async genToken(id: string) {
        const payload = { sub: id };
        return {access_token: await this.jwt.signAsync(payload, { expiresIn: '2h' })};
    }

    async localSignUp(dto: AuthDto){
        // create hashed password;
        const   salt = await bcrypt.genSalt();
        const   hash = await bcrypt.hash(dto.password, salt);
        // create new user
        return this.user.create({
            email: dto.email,
            hash,
            username: this.user.generateUser()
        })
    }

    async localSignIn(dto: AuthDto){

        const user = await this.user.finduserByEmail(dto.email)
        if (!user)
            throw new ForbiddenException('Email not found in database');
        // check for password
        const cmp = await bcrypt.compare(dto.password, user.hash);
        if (!cmp)
            throw new UnauthorizedException('Uncorrect password');
        // create a jwt;
        return this.genToken(user.id_user);
    }

}
