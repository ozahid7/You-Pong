import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FindUserService {
    constructor(private prisma:PrismaService){}
    async finduserById(_id: string){
        const user = await this.prisma.user.findUnique({
            where:{
                id_user: _id
            },
            include: {
                freindship_freind: true,
                freindship_user: true,
                channels: true,
            },
        });
        return (user);
    };

    async finduserByUserName(_username: string){
        const user = await this.prisma.user.findUnique({
            where:{
                username: _username
            },
            include:{
                freindship_freind: true,
                freindship_user:true,
                channels: true,
            },
        });
        return (user);
    };
    
    async finduserByEmail(_email: string){
        const user = await this.prisma.user.findUnique({
            where:{
                email: _email
            },
            include:{
                freindship_freind: true,
                freindship_user:true,
                channels: true,
            }
        });
        return (user);
    };
}