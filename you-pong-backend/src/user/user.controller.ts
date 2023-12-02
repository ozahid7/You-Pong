import { Body, Controller, Get, Param, Patch, Post, UseGuards, HttpException, Delete, Res, Req, ForbiddenException, ServiceUnavailableException } from '@nestjs/common';
import { userDto } from './dto/user.create.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { TfaUserService } from './services/tfa.service';
import { FindUserService, InfoUserService, UserService } from './services';
import { tfaDto } from 'src/auth/dto';
import * as qrocode from 'qrcode';
import { achievUserService } from './services/achievemennt.service';
import { title } from 'process';
import {  unlockAchDto } from './dto';
import { friendDto } from 'src/friend/dto';

// @UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(
	private TfaUserService: TfaUserService,
	private userService: UserService,
	private infosService: InfoUserService,
	private achUserService: achievUserService,
	private findService: FindUserService
  ) {}

  //POST MANY
  @Post('/many')
  async postUsers(@Body() users: userDto[]) {
	try {
	  const result = await this.userService.postUsers(users);
	  return result;
	} catch (error) {
	  throw new HttpException('Failed to create user', 503);
	}
  }

  //POST
  @Post()
  async postUser(@Body() user: userDto) {
	try {
	  const result = await this.userService.postUser(user);
	  return result;
	} catch (error) {
	  throw new HttpException('Failed to create user', 503);
	}
  }
//
  //DELETE
  @Delete(':username')
  async deleteUser(@Param('username') username: string) {
	try {
	  const result = await this.userService.deleteUser(username);
	  return result;
	} catch (error) {
	  throw new HttpException('Failed to delete users', 209);
	}
  }

  //DELETE MANY
  @Delete()
  async deleteUsers() {
	try {
	  const result = await this.userService.deleteUsers();
	  return result;
	} catch (error) {
	  throw new HttpException('Failed to delete users', 209);
	}
  }

  //GET
	@Get()
	async getUsers() {
	  try {
		const result = await this.userService.getUsers();
		return result;
	  } catch (error) {
		throw new HttpException('Failed to get users', 209);
	  }
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('signout')
	async signout(@Res() res: Response){
		await this.userService.signout(res);
	}

	@Post('/tfa/switch')
	@UseGuards(AuthGuard('jwt'))
	async set(@Req() req, @Body() dto: tfaDto){
		return await this.TfaUserService.switchTfaStatus(req.user.sub, dto.code);
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('/twoFactorAuth/')
	async twoFactorAuth(@Req() req, @Res() res) {
		try {
			const _id = req.user.sub;
			const tfaInfo = await this.TfaUserService.genTfaSecret(_id);
			const qr = await qrocode.toDataURL(tfaInfo);
			res.status(201).json({img : qr})
		} catch(error) {
			throw new ForbiddenException("couldn't generate Qr Code");
		}
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('/GetHero/')
	async getHero(@Res() res: Response, @Req() req){
		const _id = req.user.sub;
		res.status(200).json(await this.infosService.getHero(_id));
	}

	// @UseGuards(AuthGuard('jwt'))
	// @Post('/achievement/unlock')
	// async setOwned(@Req() req, @Body() dto: unlockAchDto){
	// 	return this.achUserService.setOWned(req.user.sub, dto.title);
	// }
	
	@UseGuards(AuthGuard('jwt'))
	@Get('/findUser')
	async findUser(@Body() dto: friendDto, @Res() res){
		const val =  await this.userService.findUser(dto.friend);
		res.status(201).json(val);
	}
	@UseGuards(AuthGuard('jwt'))
	@Patch('/updateUsername')
	async updateUsername(@Req()req, @Body() dto: friendDto) {
		const _id = req.user.sub;
		await this.userService.updateUsername(_id, dto.friend);
	}
	
	@UseGuards(AuthGuard('jwt'))
	@Post('incMatchRes')
	async incMatchRes(@Body() dto: friendDto, @Req() req){
		const _id = req.user.sub;
		if (dto.friend == "victory")
			return await this.infosService.incVictory(_id);
		else if (dto.friend == "defeat")
			return await this.infosService.incDefeat(_id);
		throw new ServiceUnavailableException('Unvalide match result');
	}
}
