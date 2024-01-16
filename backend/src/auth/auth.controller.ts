import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { localDto, tfaDto } from './dto';
import { Request, Response } from 'express';
import { isLoggedGuard } from './guards';
import { AuthGuard } from '@nestjs/passport';
import { FtService, TfaAuthService, localService } from './services';

@UseGuards(isLoggedGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private localService: localService,
    private ftService: FtService,
    private TfaAuthService: TfaAuthService,
  ) {}

  @Post('/local/signup')
  async localSignUp(@Req() req: Request, @Body() dto: localDto) {
    return await this.localService.localSignUp(dto);
  }

  @Post('/local/signin')
  async localSignIn(@Res() res: Response, @Body() dto: localDto) {
    return await this.localService.localSignIn(res, dto);
  }

  @UseGuards(AuthGuard('tfa'))
  @Post('/twoFactorAuth/')
  async validateTfo(@Req() req, @Res() res: Response, @Body() dto: tfaDto) {
    const _id = req.user.sub;
    return await this.TfaAuthService.validateTfa(dto, _id, res);
  }
}
