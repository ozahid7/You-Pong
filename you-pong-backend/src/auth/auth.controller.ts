import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Res, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService){}
    
    @Post('/local/signup')
    localSignUp(@Body() dto:AuthDto) {
        return this.authservice.localSignUp(dto)
    }
    
    @Post('/local/signin')
    localSignIn(@Body() dto:AuthDto){
        return this.authservice.localSignIn(dto)
    }

    @UseGuards(AuthGuard('42'))
    @Get('/42/callback')
    ftCallBack(@Res() res: Response){
        this.authservice.ftAuoth()
        res.redirect('/user/me');
    }
}
