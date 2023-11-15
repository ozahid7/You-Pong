import { Body, Controller, Post, Req, Res,  } from "@nestjs/common"
import { localDto } from "./dto"
import { AuthService } from "./auth.service"
import { Response } from "express"

// @UseGuards(isLoggedGuard)
@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService){}

    @Post('/local/signup')
    localSignUp(@Req() req: Request, @Body() dto:localDto) {
        return this.authservice.localSignUp(dto)
    }

    /**
     * @param dto : email and password
     * @param res : response object
     * @returns 
     */
    @Post('/local/signin')
    async localSignIn(@Res() res: Response, @Body() dto:localDto){
        const tolken = await this.authservice.localSignIn(dto);
        // res.cookie('access_token', tolken.access_token, {httpOnly: true, maxAge: 86400000})
        return "hello world"
    }
}
