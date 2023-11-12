import { Body, Controller, Get, Headers, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { authenticate } from 'passport';
import { UserService } from './user.service';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { TfohDto } from 'src/auth/dto';

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
