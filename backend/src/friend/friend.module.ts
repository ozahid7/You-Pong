import { Module } from "@nestjs/common";
import { friendController } from "./friend.controller";
import { friendService } from "./friend.service";
import { ChannelService } from "src/chat/channel/channel.service";

@Module({
    controllers: [friendController],
    providers: [friendService, ChannelService]
})
export class FriendModule{}