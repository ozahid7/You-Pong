import { ForbiddenException, Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { FindUserService, TfaUserService } from 'src/user/services';

@Injectable()
export class AuthService 
{
	constructor(private jwt:JwtService,){}

	async genToken(id: string) {
		const payload = { sub: id };
		return  await this.jwt.signAsync(payload, { expiresIn: '24h', secret: process.env.JWT_SECRET });
	}

	async genCookie(@Res() res: Response, _id : string, key) {
		const token = await this.genToken(_id);
		try {
			res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
			res.clearCookie(key);
			res.cookie(key, token, {maxAge: 86400000, secure: true});
		} catch (error) {
			throw new ForbiddenException(error);
		}
	}
}
