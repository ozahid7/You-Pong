import { Injectable, NotFoundException } from "@nestjs/common";
import { FindUserService } from "./find.service";
import { use } from "passport";

@Injectable()
export class InfoUserService {
    constructor(private finduser: FindUserService){}
    async getHero(_id: string) {
        const user = await this.finduser.finduserById(_id);
        if (!user)
            throw new NotFoundException('user not found!');
        return {
            usernfo:{
                username: user.username,
                level: user.level,
                rank: user.rank,
                loses: user.defeats,
                wins: user.victory
            }
        };
    }
}
