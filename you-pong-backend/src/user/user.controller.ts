import { Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { authenticate } from 'passport';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    @Patch('update/username/:id/:newUsername')
    updateUsername(@Param('id') id: string, @Param('newUsername') newUsername: string) {
        return this.userService.updateUsername(id, newUsername);
    }        
}
