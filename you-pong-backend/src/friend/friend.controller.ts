import { Body, Controller, Delete, Patch, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { friendDto } from "./dto";
import { friendService } from "./friend.service";
import { FindUserService } from "src/user/services";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";

@Controller('friend')
export class friendController{
    constructor(private friendService: friendService,){}

    // send request
    @Post('send')
    @UseGuards(AuthGuard('jwt'))
    async send(@Req() req, @Res() res: Response, @Body() dto: friendDto){
        res
        .status(200)
        .json(await this.friendService.send(req.user.sub, dto.friend));
    }
    
    // accept request
    @Post('accept')
    @UseGuards(AuthGuard('jwt'))
    async accept(@Req() req, @Res() res, @Body() dto: friendDto){
        res
        .status(200)
        .json(await this.friendService.accept(req.user.sub, dto.friend));
    }

    // decline requset
    @Delete('decline')
    @UseGuards(AuthGuard('jwt'))
    async decline(@Req() req, @Res() res, @Body() dto: friendDto){
        res
        .status(200)
        .json(await this.friendService.decline(req.user.sub, dto.friend));
    }

    // remove friend
    @Delete('remove')
    @UseGuards(AuthGuard('jwt'))
    async remove(@Req() req, @Res() res, @Body() dto: friendDto){
        res
        .status(200)
        .json(await this.friendService.remove(req.user.sub, dto.friend));
    }

    // block user
    @Patch('block')
    @UseGuards(AuthGuard('jwt'))
    async block(@Req() req, @Res() res, @Body() dto: friendDto){
        res
        .status(200)
        .json(await this.friendService.block(req.user.sub, dto.friend));
        
    }
    
    @Get('sort')
    @UseGuards(AuthGuard('jwt'))
    async sort(@Req() req, @Res() res) {
        res
        .status(200)
        .json(await this.friendService.sort(req.user.sub));
    }
}
