import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class friendService {
    constructor(private prisma: PrismaService){}
    async sendFriendReq(user: string, friend: string) {
        try {
            this.prisma.freindship.create({
                data: {
                    id_user: user,
                    id_freind: friend,
                    state: "PENDING",
                }
            })
        } catch(error) {
            throw new BadRequestException("couldn't add friend");
        }
    }
}
