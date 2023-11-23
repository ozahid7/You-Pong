import { ForbiddenException, Injectable } from "@nestjs/common";
import { AchievementService } from "src/achievement/achievement.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class achievUserService { 
    constructor (private prisma: PrismaService,
                 private achService: AchievementService){}
    // unlock achievement -> create Owned
    async setOWned(_id: string, title: string) {
        try {
            const ach = await this.achService.findAch(title);
            await this.prisma.owned.create({
                data: {
                    id_user: _id,
                    id_achievement: ach.id_achievement,
                },
            });
        } catch(error) {
            throw new ForbiddenException(error);
        }
    }
    // lock achievement -> remove owned
    // get 

}