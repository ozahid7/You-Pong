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

    async findUser(_email: string){
        const user = await this.prisma.user.findUnique({
            where:{
                email: _email
            }
        });
        return user
    }

    async localSignUp(dto: AuthDto){
        // create hashed password;
        const   salt = await bcrypt.genSalt();
        const   hash = await bcrypt.hash(dto.password, salt);
        // create new user
        return this.user.create({
            email: dto.email,
            hash
        })
    }
    
    async localSignIn(dto: AuthDto){

        const user = await this.findUser(dto.email)
        if (!user)
            throw new ForbiddenException('Email not found in database');
        // check for password
        const cmp = await bcrypt.compare(dto.password, user.hash);
        if (!cmp)
            throw new UnauthorizedException('Uncorrect password');
        // create a jwt;
        const payload = { sub: user.id_user };
        return {access_token: await this.jwt.signAsync(payload, { expiresIn: '2h' })};
    }
    
    ftAuoth(){
        return "allo?"
    }
}
