import { Req } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import  Strategy  from "passport-42"

export class FtStrategy extends PassportStrategy(Strategy, '42'){
    constructor(){
        super({
            clientID : process.env.FT_UID,
            clientSecret: process.env.FT_SEC,
            callbackURL: process.env.FT_CALLBACK,
            passReqToCallback:true
        })
    }
    validate(@Req() req: Request){
        try {
            
        } catch (error) {
            
        };
    }
}
