import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
    async localSignUp(dto:AuthDto){
        // create a hash password
        const salt = await bcrypt.genSalt()
        // create password
        const hash = await bcrypt.hash(salt, dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    username: "user" + Math.random()
                }
            })
        return user
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('Email is already in use');
            }
            throw error
        }
    }
}
