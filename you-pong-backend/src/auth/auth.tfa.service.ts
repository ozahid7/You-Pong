import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { authenticator } from 'otplib';

@Injectable()
export class TFAService{
    constructor (private user: UserService){}
    //  * Generates a random Base32 Secret Key.

    tfaSecreteGenerate(){
        const secret = authenticator.generateSecret();

        const optPathUrl = authenticator.keyuri()
    }
}