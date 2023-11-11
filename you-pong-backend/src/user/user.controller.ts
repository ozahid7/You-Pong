import { Controller, Get, Headers, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { authenticate } from 'passport';
import { UserService } from './user.service';

// @UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    
    @Patch('update/username/:id/:newUsername')
    updateUsername(@Param('id') id: string, @Param('newUsername') newUsername: string) {
        return this.userService.updateUsername(id, newUsername);
    }
    
    @Get('checkJwt')
    checkJwt(@Headers('Authorization') token: string){
        console.log(token);
    }

    @Get('/me')
    getMe(){
        return {username: "adam", lastname: "abdo"}
    }        
}
