import { Body, Controller, Get, Headers, Param, Patch, Post, UseGuards, HttpException, Delete, Res, Req, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
// import { TfohDto } from 'src/auth/dto';
import { userDto } from './dto/user.create.dto';
import { Request } from 'express';

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
    // NotFoundException(`user with id ${_id} not found`)
    @ApiCreatedResponse({description: "change the user's username"})
    @ApiConflictResponse({description: "Username already in use"})
    @ApiNotFoundResponse({description: "user with id 'id' not found"})
    @Patch('update/username/:id/:newUsername')
    updateUsername(@Param('id') id: string, @Param('newUsername') newUsername: string) {
        return this.userService.updateUsername(id, newUsername);
    }

    @Get('checkJwt')
    checkJwt(@Headers('Authorization') token: string){
        console.log(token);
    }

    @Get('/me')
    async getMe(@Req() req: Request){
      try{
        const specificCookie = await req.cookies['access_token'];
        console.log('Cookies:', specificCookie);
      } catch(error){
        throw new ForbiddenException('cookie not found')
      }

      // Print the cookies from the request object
    
      return {username: "adam", lastname: "abdo"}
    }
}
