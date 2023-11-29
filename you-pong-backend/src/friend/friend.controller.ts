import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { friendService } from "./friend.service";
import { sendReq } from "./dto";

@Controller('friend')
export class friendController {
    constructor (private friendService: friendService){}
    
    // send a friend request;
    @UseGuards(AuthGuard('jwt'))
    @Post('sendFriendReq')
    async sendFriendReq(@Req() req, @Body() dto: sendReq) {
        const user = req.user.sub
        return this.friendService.sendFriendReq(user, dto.user);
    }

    // accept a friend request;
    // refuse a friend request;

    // remove a friend;
    // block a friend;
}
