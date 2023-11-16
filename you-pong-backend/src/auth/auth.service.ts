import { ForbiddenException, Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { localDto, tfaDto } from './dto';
import { Request, Response } from 'express';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { use } from 'passport';

@Injectable()
export class AuthService 
{
	constructor(private prisma: PrismaService, private jwt:JwtService, private user: UserService){}


	async genToken(id: string) {
		const payload = { sub: id };
		return  await this.jwt.signAsync(payload, { expiresIn: '24h' });
	}

	async genCookie(@Res() res: Response, _id : string, key) {
		const token = await this.genToken(_id);
		try {
			res.clearCookie(key);
			res.cookie(key, token, {httpOnly: true, maxAge: 86400000});
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
		// generate access Cookie
		if (tfaStatus == true) 
			await this.genCookie(res, user.id_user, 'access_token')
		// generate tfa Cookie
		else
			await this.genCookie(res, user.id_user, 'tfa')
		return res.status(201).json({tfaStatus});
	}
	
	async genTfaSecret(_id : string) {		
		const user = await this.user.finduserById(_id);
		if (!user)
			throw new ForbiddenException ('Id not found in database');
		const secret = authenticator.generateSecret();
		const optPathUrl = authenticator.keyuri(user.email, process.env.APP_NAME, secret);
		await this.user.setTfaSecret(secret, _id);
		return optPathUrl;
	}

	async pipeQrCodeStream(stream: Response, optPathUrl: string) {
		return await toFileStream(stream, optPathUrl);
	}
	
	async checkCode(code :string, user: any) : Promise<boolean> {
		try {
			const valid =  await authenticator.verify({
				token: code,
				secret: (await user).two_fact_auth
			})
				return valid;
		} catch (error) {
			throw new ForbiddenException('wrong id')
		}
	}

	async validateTfa(dto: tfaDto, _id: string, res: Response) {
		const user = this.user.finduserById(_id);
		if (!user)
			return false;
		const valid = await this.checkCode(dto.code, user);
		if (valid == true) {
			await res.clearCookie('tfa');
			await this.genCookie(res, _id, 'access_token')
		}
		res.json({valid})
	}
}
// this.user.switchTfaStatus((await user.id_user);
