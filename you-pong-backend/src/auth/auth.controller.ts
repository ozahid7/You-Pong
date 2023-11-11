import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { isLoggedGuard } from 'src/guards/isLoggedIn.guard';
import { TFAService } from './auth.tfa.service';

@UseGuards(isLoggedGuard)
@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService,
                private tfa: TFAService){}
    
    @Post('/local/signup')
    localSignUp(@Req() req: Request, @Body() dto:AuthDto) {
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

    @Post('/twoFactorAuth/:id')
    async twoFactorAuth(@Res() res: Response, @Param('id') id: string){
        const tfaInfo = await this.tfa.tfaSecreteGenerate(id);
        return this.tfa.pipeQrCodeStream(res, tfaInfo.optPathUrl);
    }
}
