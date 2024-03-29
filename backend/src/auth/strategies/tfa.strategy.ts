import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-jwt";
import { UserService } from "src/user/services";

@Injectable()
export class TfaStrategy extends PassportStrategy(Strategy, 'tfa'){

    constructor(private  user: UserService) {
        super({
            secretOrKey: process.env.TFA_JWT_SECRET,
            jwtFromRequest: (req: Request) => {
                try {
                    const token = req.cookies['tfa'];
                    return token;
                } catch(error) {
                    throw new ForbiddenException(error);
                }
            },
            ignoreExpiration: false,
        });
      }
      
    validate(payload: any){
        return payload
    }
}
