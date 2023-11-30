import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { localDto, tfaDto } from './dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { isLoggedGuard } from './guards';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(isLoggedGuard)
@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('/local/signup')
  async localSignUp(@Req() req: Request, @Body() dto: localDto) {
    return await this.authservice.localSignUp(dto);
  }

  @Post('/local/signin')
  async localSignIn(@Res() res: Response, @Body() dto: localDto) {
    return await this.authservice.localSignIn(res, dto);
  }

  @UseGuards(AuthGuard('tfa'))
  @Get('/twoFactorAuth/')
  async twoFactorAuth(@Req() req, @Res() res: Response) {
    const _id = req.user.sub;

    const tfaInfo = await this.authservice.genTfaSecret(_id);
    return await this.authservice.pipeQrCodeStream(res, tfaInfo);
  }

  @UseGuards(AuthGuard('tfa'))
  @Post('/twoFactorAuth/')
  async validateTfo(@Req() req, @Res() res: Response, @Body() dto: tfaDto) {
    const _id = req.user.sub;

    return await this.authservice.validateTfa(dto, _id, res);
  }

  @Get('/42')
  @UseGuards(AuthGuard('42'))
  ftAuth(@Req() req: Request) {}

  @Get('/42/callback')
  @UseGuards(AuthGuard('42'))
  async ftCall(@Res() res: Response, @Req() req: Request) {
    this.ftAuth(req);
    await this.authservice.ftSignIn(res, req, req['id_user']);
  }
}
