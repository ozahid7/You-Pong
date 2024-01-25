import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  HttpException,
  Res,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { TfaUserService } from './services/tfa.service';
import { InfoUserService, UserService } from './services';
import { tfaDto } from 'src/auth/dto';
import * as qrocode from 'qrcode';
import { UpdateUserDto } from './dto';
import { friendDto } from 'src/friend/dto';
import { UpdateService } from './services/update.service';

@Controller('user')
export class UserController {
  constructor(
    private TfaUserService: TfaUserService,
    private userService: UserService,
    private infosService: InfoUserService,
    private updateService: UpdateService,
  ) {}


  @UseGuards(AuthGuard('jwt'))
  @Get('signout')
  async signout(@Res() res: Response) {
    await this.userService.signout(res);
  }

  @Post('/tfa/switch')
  @UseGuards(AuthGuard('jwt'))
  async set(@Req() req, @Body() dto: tfaDto) {
    return await this.TfaUserService.switchTfaStatus(req.user.sub, dto.code);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/twoFactorAuth/')
  async twoFactorAuth(@Req() req, @Res() res) {
    try {
      const _id = req.user.sub;
      const tfaInfo = await this.TfaUserService.genTfaSecret(_id);
      const qr = await qrocode.toDataURL(tfaInfo);
      res.status(201).json({ img: qr });
    } catch (error) {
      throw new ForbiddenException("couldn't generate Qr Code");
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/GetHero/')
  async getHero(@Res() res: Response, @Req() req) {
    const _id = req.user.sub;
    res.status(200).json(await this.infosService.getHero(_id));
  }

  //GET
  @Get('/channels')
  @UseGuards(AuthGuard('jwt'))
  async getUserChannels(@Req() req) {
    try {
      const _id = req.user.sub;
      const result = await this.userService.getUserChannels(_id);
      return result;
    } catch (error) {
      throw new HttpException('Failed to get channels of user', 209);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/findUser')
  async findUser(@Body() dto: friendDto, @Res() res, @Req() req) {
    const _id = req.user.sub;
    const val = await this.userService.findUser(dto.friend, _id);
    res.status(201).json(val);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/update')
  async update(@Req() req, @Body() dto: UpdateUserDto) {
    const _id = req.user.sub;
    return await this.updateService.update(_id, dto);
  }
}
