import { Body, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto, TfohDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Response } from 'express';

@Injectable()
export class AuthService 
{
    constructor(private prisma: PrismaService, private jwt:JwtService, private user: UserService){}


    async genToken(id: string) {
        const payload = { sub: id };
        return {access_token: await this.jwt.signAsync(payload, { expiresIn: '2h' })};
    }

    async localSignUp(dto: AuthDto) {
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

    async localSignIn(dto: AuthDto) {

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

    async generateTfaSecret(_id: string) {
            const user = await this.user.finduserById(_id);
            if (!user)
                throw new ForbiddenException ('Id not found in database');
            const secret = authenticator.generateSecret();
            const optPathUrl = authenticator.keyuri(user.email, process.env.APP_NAME, secret);
            await this.user.setTfa(secret, _id);
            return optPathUrl;
        }
        
        async pipeQrCodeStream(stream: Response, optPathUrl: string) {
            return await toFileStream(stream, optPathUrl);
        }
        
        async validateTfa(dto: TfohDto, _id: string) {
            const user = this.user.finduserById(_id);

            try{
                const valid =  authenticator.verify({
                    token: dto.token,
                    secret: (await user).two_fact_auth
                })
                if (valid === false)
                    return "ghalat";
                if (valid === true)
                    return "sa7iiii7"       
            } catch (error) {
                throw new ForbiddenException('wrong id')
            }
        }
}
