import { Inject, Injectable, Req } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy }  from "passport-42"
import { AuthService } from "../auth.service"
import { UserService } from "src/user/user.service"

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy, '42'){
    constructor(private authService: AuthService,
                private user: UserService){
        super({
            clientID : process.env.FT_UID,
            clientSecret: process.env.FT_SEC,
            callbackURL: process.env.FT_CALLBACK,
            passReqToCallback:true
        })
    }

    async validate(@Req() req: Request, at, rf, profile, callback){
                
        const user = await this.user.finduserByEmail(profile.emails[0].value);
        // create a user if it's not there !><
        if (!user){
            const checkName = async (name: string) => {
                const user = await this.user.finduserByUserName(name);
                if (!user)
                    return profile.username;
                
            }
            return this.user.create({
                email: profile.emails[0].value,
                // username: this.user.generateUser(),
                username: profile.username,
                familyName: profile.name.familyName,
                givenName: profile.name.givenName,
                avatar: profile.photos[0].value
            })
        }        
        return user;
    }
}
