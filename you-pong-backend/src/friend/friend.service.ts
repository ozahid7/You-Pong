import { BadRequestException, Injectable, ServiceUnavailableException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FindUserService } from "src/user/services";

@Injectable()
export class friendService{
    constructor(private prisma: PrismaService,
                private findUser: FindUserService){}

    async postcolumn() {
        try {
            
        } catch (error) {
            throw new BadRequestException("")
        }
    }

    async sendReq(userUid: string, friendName: string) {
        const friend = this.findUser.finduserByUserName(friendName);
        if (!friend)
            throw new ServiceUnavailableException(`Could't find friend with this username ${friendName}`);
        const user = this.findUser.finduserById(userUid);
        if (!user)
            throw new BadRequestException("DB couldn't fetch user please ma sure theat you're logged");

        this.prisma.freindship.create({
            data: {
                id_freind: "allo",
                id_user: "hello",
                state: "ACCEPTED",
                id_freindship: userUid + friendName
            }
        })
    }
}