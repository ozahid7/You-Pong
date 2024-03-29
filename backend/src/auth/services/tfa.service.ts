import { Injectable } from "@nestjs/common";
import { tfaDto } from "../dto";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { FindUserService, TfaUserService, UserService } from "src/user/services";

@Injectable()
export class TfaAuthService 
{
    constructor(private TfaUserService: TfaUserService,
                private authService: AuthService,
				private findUser: FindUserService){}
    async validateTfa(dto: tfaDto, _id: string, res: Response) {
		const user = this.findUser.finduserById(_id);
		if (!user)
			return false;
		const valid = await this.TfaUserService.checkTfaCode(dto.code, user);
		if (valid == true) {
			res.clearCookie('tfa');
			await this.authService.genCookie(res, _id, 'access_token')
		}
		res.json({valid})
	}
	
	async getTfaStatus(_id: string) {
		return (await this.findUser.finduserById(_id)).tfaIsEnable;
	}
}
