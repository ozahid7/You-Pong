import { Module } from "@nestjs/common";
import { friendController } from "./friend.controller";
import { friendService } from "./friend.service";
import { FindUserService } from "src/user/services";

@Module({
    controllers: [friendController],
    providers: [friendService, FindUserService]
})
export class FriendModule{}