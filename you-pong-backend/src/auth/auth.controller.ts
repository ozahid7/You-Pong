import { Body, Controller, ForbiddenException, Get, InternalServerErrorException, NotFoundException, Param, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, TfohDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { isLoggedGuard } from 'src/guards/isLoggedIn.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@UseGuards(isLoggedGuard)
@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService){}

    @Post('/local/signup')
    @ApiCreatedResponse({description: "create a new user"})
    @ApiForbiddenResponse({description:"Email Already in Use"})
    localSignUp(@Req() req: Request, @Body() dto:AuthDto) {
        return this.authservice.localSignUp(dto)
    }

    // @UseGuards(AuthGuard('jwt'))
    @Post('/local/signin')
    @ApiCreatedResponse({description: "return object has access token 'jwt'"})
    @ApiForbiddenResponse({description: "Email not found in database"})
    @ApiUnauthorizedResponse({description: "Uncorrect password"})
    @ApiBearerAuth()
    localSignIn(@Body() dto:AuthDto){
        return this.authservice.localSignIn(dto)
    }
    
    @Get('/42/callback')
    @ApiCreatedResponse({description: "create a new user with 42's profile info if user doesn't exist, otherwise logg into the game"})
    @ApiForbiddenResponse({description: "Email not found in database"})
    @UseGuards(AuthGuard('42'))
    ftCall(@Res() res: Response){
        res.redirect('/user/me');
    }
    
    
    @ApiCreatedResponse({description: "Generates a QR code for TFA"})
    @ApiForbiddenResponse({description: "Id not found in database"})
    @Get('/twoFactorAuth/:id')
    async twoFactorAuth(@Res() res: Response, @Param('id') id: string){
        const tfaInfo = await this.authservice.generateTfaSecret(id);
        return this.authservice.pipeQrCodeStream(res, tfaInfo);
    }
    
    @ApiCreatedResponse({description: "return an object has access toket 'jwt'"})
    @ApiForbiddenResponse({description: "Wrong id"})
    @Post('/twoFactorAuth/:id')
    async validateTfo(@Body() dto:TfohDto, @Param('id') id:string) {
        return this.authservice.validateTfa(dto, id);
    }
}
