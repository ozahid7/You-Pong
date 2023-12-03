import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { friendDto } from "./dto";
import { friendService } from "./friend.service";
import { FindUserService } from "src/user/services";
import { AuthGuard } from "@nestjs/passport";

@Controller('friend')
export class friendController{
    constructor(private friendService: friendService,){
    }

    @Post('sendReq')
    @UseGuards(AuthGuard('jwt'))
    async sendReq(@Req() req, @Res() res ,@Body() dto: friendDto) {
        res
        .status(201)
        .json(await this.friendService.sendReq(req.user.sub, dto.friend));
    }
    
    @Post('acceptReq')
    @UseGuards(AuthGuard('jwt'))
    async acceptReq(@Req() req, @Res() res ,@Body() dto: friendDto) {
        res
        .status(201)
        .json(await this.friendService.acceptReq(req.user.sub, dto.friend));

    }
}