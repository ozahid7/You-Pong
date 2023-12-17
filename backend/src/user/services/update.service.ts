import { BadRequestException, Injectable } from "@nestjs/common";
import { FindUserService } from "./find.service";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from "../dto";

@Injectable()
export class UpdateService {
    constructor(private finduser: FindUserService,
        private prisma: PrismaService){}

        async updateAvatar(id: string, avatar: string) {
            try {
                const user = await this.prisma.user.update({
                    where: {id_user: id},
                    data: {avatar}
                });
                return {'SUCCSESS': 'Avatar updated'};
            } catch (error) {
                return {'ERROR': 'Failed to update avatar'};
            }
        }

        async updateUsername(id: string, username: string) {
            try
            {
                const taken = await this.prisma.user.findUnique({
                    where: {username}
                });
                if (taken)
                {
                    const takenError = new BadRequestException('Username already taken');
                    takenError.name = 'P2002';
                    throw takenError;
                }
                const user = await this.prisma.user.update({
                    where: {id_user: id},
                    data: {username: username}
                });
                return {'SUCCSESS': 'Username updated'};
            } catch (error) {
                if (error.name == 'P2002')
                    return {'ERROR': 'Username already taken'};
                return {'ERROR': 'Failed to update username'};
            }
        }
    
        async updatePassword(id: string, dto: any) {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(dto.newPassword, salt);
            try
            {
                const user = await this.prisma.user.update({
                    where: {id_user: id},
                    data: {hash}
                });
                return {'SUCCSESS': 'Password updated'};
            } catch (error) {
                return {'ERROR': 'Failed to update password'};
            }
        }

        async update(id: string, dto: UpdateUserDto) {

            const ret: {
  		    	newPass: any;
  			    newUsername: any;
  			    newAvatar: any;
  		    } = {} as { newPass: any; 
                        newUsername: any;
                        newAvatar: any;
                    };

            // find user
            const user = await this.finduser.finduserById(id);
            // validate password if exists
            if (user.hash)
            {
                const cmp = await bcrypt.compare(dto.password, user.hash);
                if (!cmp)
                    throw new BadRequestException('Uncorrect password');
            }          
            // check signup
            if (!user.username && !dto.newUsername) // za3ma username
                throw new BadRequestException('Set a username ndin dyemak');         
            // update avatar
            if (dto.newAvatar)
                ret.newAvatar = await this.updateAvatar(id, dto.newAvatar);
            // udate username if given
            if (dto.newUsername)
                ret.newUsername = await this.updateUsername(id, dto.newUsername);
            // update password if given
            if (dto.newPassword && !(await bcrypt.compare(dto.newPassword, user.hash)))
                ret.newPass = await this.updatePassword(id, dto);
            return ret;
        }
    }