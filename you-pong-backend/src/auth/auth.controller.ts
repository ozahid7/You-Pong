import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

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
    ftCall(@Res() res: Response){
        res.redirect('/user/me');
    }
}
