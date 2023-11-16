import { Body, Controller, ForbiddenException, Get, Inject, Post, Req, Res, UseGuards } from "@nestjs/common"
import { localDto, tfaDto } from "./dto"
import { AuthService } from "./auth.service"
import { Request, Response } from "express"
import { isLoggedGuard } from "./guards"
import { AuthGuard } from "@nestjs/passport"

// @UseGuards(isLoggedGuard)
@UseGuards(isLoggedGuard)
@Controller('auth')
export class AuthController {
	constructor(private authservice: AuthService){}

	@Post('/local/signup')
	async localSignUp(@Req() req: Request, @Body() dto:localDto) {
		return await this.authservice.localSignUp(dto)
	}

	/**
	 * @param dto : email and password
	 * @param res : response object
	 * @returns 
	 */
	@Post('/local/signin')
	async localSignIn(@Res() res: Response, @Body() dto:localDto){
		return await this.authservice.localSignIn(res, dto);
	}

	@UseGuards(AuthGuard('tfa'))
	@Get('/twoFactorAuth/')
	async twoFactorAuth(@Req() req, @Res() res: Response){
		const _id = req.user.sub;
		
		const tfaInfo = await this.authservice.genTfaSecret(_id);
		return await this.authservice.pipeQrCodeStream(res, tfaInfo);    
	}
	
	@UseGuards(AuthGuard('tfa'))
	@Post('/twoFactorAuth/')
	async validateTfo(@Req() req, @Res() res: Response ,@Body() dto:tfaDto) {
		const _id = req.user.sub;
		
		return await this.authservice.validateTfa(dto, _id, res);
	}
}
