import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FindUserService } from "./find.service";
import { authenticator } from 'otplib';

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

    async switchTfaStatus(_id: string, code: string) {
      const user = this.findUser.finduserById(_id);
      if (!user)
        throw new NotFoundException('user not found')
      try {
            if ((await user).tfaIsEnable && (await this.checkTfaCode(code, user)))
                throw new ForbiddenException('code is incorrect');
            await this.prisma.user.update({
                where: {
                    id_user: _id,
                },
                data: {
                    tfaIsEnable: !(await this.getTfaStatus((await user))),
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

    async checkTfaCode(code :string, user: any) : Promise<boolean> {
        try {
            const valid =  await authenticator.verify({
                token: code,
                secret: (await user).two_fact_auth
            })
                return valid;
        } catch (error) {
            throw new ForbiddenException('wrong id')
        }
    }

    async genTfaSecret(_id : string) {		
		const user = await this.findUser.finduserById(_id);
		if (!user)
			throw new ForbiddenException ('Id not found in database');
		const secret = authenticator.generateSecret();
		const optPathUrl = authenticator.keyuri(user.email, process.env.APP_NAME, secret);
		await this.setTfaSecret(secret, _id);
		return await optPathUrl;
	}

}
