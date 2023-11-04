import { Body, Controller, Post, Get, ConflictException, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { userDto } from './dto/user.create.dto';

@Controller('user')
export class UserController {
    constructor(private prisma: PrismaService, private userService: UserService) {}

    //POST
    @Post()
    async postUser(@Body() user: userDto){
        try {
            const result = await this.userService.postUser(user);
            return result;
        } catch (error) {
            throw new HttpException('Failed to create user', 503);
        }
    };

    //DELETE
    @Delete()
    async deleteUsers(){
        try{
            const result = await this.userService.deleteUsers();
            return result;
        }
        catch(error)
        {
            throw new HttpException('Failed to delete users', 209)
        }
    }
   
    //GET
    @Get()
    async getUsers(){
        try{
            const result = await this.userService.getUsers();
            return result;
        }
        catch(error)
        {
            throw new HttpException('Failed to get users', 209)
        }
    }

}
