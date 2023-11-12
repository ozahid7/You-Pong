import { Controller, Get, Headers, Param, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { authenticate } from 'passport';
import { UserService } from './user.service';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';

// @UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
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
    getMe(){
        return {username: "adam", lastname: "abdo"}
    }        
}
