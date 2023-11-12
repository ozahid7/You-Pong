import { Body, Controller, Get, Headers, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { authenticate } from 'passport';
import {
  Body,
  ConflictException,
  HttpException,
  HttpStatus,
  Delete,
  Put,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { TfohDto } from 'src/auth/dto';

// @UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
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
    constructor(private userService: UserService){}
    // NotFoundException(`user with id ${_id} not found`)
    @ApiCreatedResponse({description: "change the user's username"})
    @ApiConflictResponse({description: "Username already in use"})
    @ApiNotFoundResponse({description: "user with id 'id' not found"})
    @Patch('update/username/:id/:newUsername')
    updateUsername(@Param('id') id: string, @Param('newUsername') newUsername: string) {
        return this.userService.updateUsername(id, newUsername);
    }

    @Post("update/tfaStatus/:id")
    updateTfaStatus(@Param('id') id: string, @Body() dto:TfohDto){
        return 'hello';
    }

    @Get('checkJwt')
    checkJwt(@Headers('Authorization') token: string){
        console.log(token);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/me')
    getMe(){
        return {username: "adam", lastname: "abdo"}
    }
}
