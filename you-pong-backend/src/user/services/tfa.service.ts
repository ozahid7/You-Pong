import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FindUserService } from "./find.service";
import { AuthService } from "src/auth/services";

@Injectable()
export class TfaUserService {
    constructor(
                private prisma: PrismaService,
                private findUser: FindUserService,
                ){}
    async getTfaStatus(user: any){
    	try {
    	  return (await user).tfaIsEnable;
    	} catch (error) {
    	  throw new NotFoundException(error)
    	}
    }

    async switchTfaStatus(_id: string) {
      const user = this.findUser.finduserById(_id);
      try{
            // if checkCode()
            await this.prisma.user.update({
                where: {
                    id_user: _id,
                },
                data: {
                    tfaIsEnable: !(await this.getTfaStatus((await this.findUser.finduserById(_id)))),
                },
            }
			);        
		} catch(error){
          throw new ForbiddenException(error);
        }
        return (await user).tfaIsEnable;
    }

    async setTfaSecret(secret: string, _id: string) {
      try {
          await this.prisma.user.update({
              where: {
                  id_user: _id,
              },
              data: {
                  two_fact_auth: secret,
              },
          });
      } catch (error){
          throw new ForbiddenException(error);
      }
  }
}
