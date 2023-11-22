import { ForbiddenException, Injectable, Req, Res } from "@nestjs/common";
import { Request } from "express";
import { FindUserService, TfaUserService, UserService } from "src/user/services";

@Injectable()
export class FtService 
{
    constructor(private TfaUserService: TfaUserService,
    			private user: UserService,
				private findUser: FindUserService){}
    async ftSignIn(@Res() res, @Req() req: Request, _id: string) {
		const user = await this.findUser.finduserById(_id);
		if (!user)
			throw new ForbiddenException('Id not found in database');
		const tfaStatus = await this.TfaUserService.getTfaStatus(user);
		if (tfaStatus == false) {
			// await this.authService.genCookie(res, user.id_user, 'access_token')
			res.redirect('/user/me');
		}
		// generate tfa Cookie
		else {
			// await this.authService.genCookie(res, user.id_user, 'tfa');
			return res.status(201).json({tfaStatus});
		}
	}
}