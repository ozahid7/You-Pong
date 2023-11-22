import { ForbiddenException, Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { FindUserService, TfaUserService } from 'src/user/services';

@Injectable()
export class AuthService 
{
	constructor(private jwt:JwtService,
				private findUser: FindUserService,
				private TfaUserService: TfaUserService){}

	async genToken(id: string) {
		const payload = { sub: id };
		return  await this.jwt.signAsync(payload, { expiresIn: '24h', secret: process.env.JWT_SECRET });
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
	
	async genTfaSecret(_id : string) {		
		const user = await this.findUser.finduserById(_id);
		if (!user)
			throw new ForbiddenException ('Id not found in database');
		const secret = authenticator.generateSecret();
		const optPathUrl = authenticator.keyuri(user.email, process.env.APP_NAME, secret);
		await this.TfaUserService.setTfaSecret(secret, _id);
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
}
