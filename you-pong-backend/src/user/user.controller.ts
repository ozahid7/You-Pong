import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { authenticate } from 'passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
    @Post('me')
    itme(){
        return "hello"
    }
    @Get('ous')
    iii(){
        return 'hello'
    }
}
