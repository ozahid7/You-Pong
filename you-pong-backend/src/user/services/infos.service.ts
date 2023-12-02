import { Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { FindUserService } from "./find.service";
import { use } from "passport";
import { PrismaService } from "src/prisma/prisma.service";
import { Owned } from "@prisma/client";
import { AchievementService } from "src/achievement/achievement.service";

@Injectable()
export class InfoUserService {
    constructor(private finduser: FindUserService,
                private prisma: PrismaService){}
        
        async creatAchObj(){
            const ach = await this.prisma.achievement.findMany();
            const objArray: { isOwned: boolean; title: string; description: string }[] = [];    
            for (const achievemennt of ach) {
                let val = await this.prisma.owned.findUnique({
                    where: {
                        id_achievement: await achievemennt.id_achievement
                    }
                });
                objArray.push({
                    isOwned: val ? true : false,
                    title: achievemennt.title,
                    description: achievemennt.description
                });
            };
            return (objArray);
        }   
        async getHero(_id: string) {
        try {
            const user = await this.finduser.finduserById(_id);
            if (!user)
                throw new NotFoundException('user not found!');
            return {
                usernfo: {
                    username: user.username,
                    level: user.level,
                    rank: user.rank,
                    loses: user.defeats,
                    wins: user.victory,
                    tfaStatus: user.tfaIsEnable,
                    achieveents: await this.creatAchObj()
                }
            };
        } catch(error){
            throw new NotFoundException('user not found');
        }
    }

    async incDefeat(_id: string) {
        try {
            await this.prisma.user.update({
                where:{
                    id_user: _id,
                }, 
                data: {
                    defeats: {
                        increment: 1
                    }
                }
            })
        } catch (error) {
            throw new ServiceUnavailableException("could't validate the defeat!");
        }
    }

    async incVictory(_id: string) {
        try {
            await this.prisma.user.update({
                where:{
                    id_user: _id,
                }, 
                data: {
                    victory: {
                        increment: 1
                    }
                }
            })
        } catch (error) {
            throw new ServiceUnavailableException("could't validate the victory!");
        }
    }
}
