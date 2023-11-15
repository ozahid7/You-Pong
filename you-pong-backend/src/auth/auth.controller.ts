import { Body, Controller, ForbiddenException, Inject, Post, Req, Res } from "@nestjs/common"
import { localDto } from "./dto"
import { AuthService } from "./auth.service"
import { Request, Response } from "express"

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
        // if 2fa enable        
        try{
            res.clearCookie('access_token');    
            res.cookie('access_token', 'tolken', {httpOnly: true, maxAge: 86400000})    
        } catch(error){
            throw new ForbiddenException('allo')
        }
        // if 2fa not enable
        res.json({})
        return true;
    }
}
