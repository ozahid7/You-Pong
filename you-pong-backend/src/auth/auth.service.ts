import { ForbiddenException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { localDto } from './dto';
import { Response } from 'express';
import { error } from 'console';

@Injectable()
export class AuthService 
{
	constructor(private prisma: PrismaService, private jwt:JwtService, private user: UserService){}


	async genToken(id: string) {
		const payload = { sub: id };
		return  await this.jwt.signAsync(payload, { expiresIn: '2h' });
	}

	async genCookie(@Res() res: Response, _id : string) {
		const token = await this.genToken(_id);
		try {
			res.clearCookie('access_token');
			res.cookie('access_token', token, {httpOnly: true, maxAge: 86400000});
		} catch (error) {
			throw new ForbiddenException(error);
		}
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

	async localSignIn(@Res() res: Response, dto: localDto) {
		// get the user object
		const user = await this.user.finduserByEmail(dto.email)
		if (!user)
			throw new ForbiddenException('Email not found in database');
		// check for password
		const cmp = await bcrypt.compare(dto.password, user.hash);
		if (!cmp)
			throw new UnauthorizedException('Uncorrect password');   
		// get user's tfa status
		const tfaStatus = await this.user.getTfaStatus(dto.email)
		if (tfaStatus == false) {
			// generate access Cookie
			await this.genCookie(res, user.id_user)
		}
		return res.status(201).json({tfaStatus});
	}

	async signout(@Res() res: Response){
		try {
			res.clearCookie('access_token');
			res.status(200).json({})
		} catch(error) {
			throw new ForbiddenException(error);
		}
	}
}

// this.user.setTfaStatus((await this.user.finduserByEmail(dto.email)).id_user, false);
