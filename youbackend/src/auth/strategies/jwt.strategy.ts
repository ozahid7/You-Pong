import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import {  Strategy } from 'passport-jwt';
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){

    constructor(private  user: UserService) {
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: (req: Request) => {
                try {
                    const token = req.cookies['access_token'];
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
