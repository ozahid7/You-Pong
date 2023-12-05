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
                channels: true,
            }
        });
        return (user);
    };
}