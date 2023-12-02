import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
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
    async sendReq(@Req() req, @Body() dto: friendDto) {
        return await this.friendService.sendReq(req.user.sub, dto.friend);
    }
}