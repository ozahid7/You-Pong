import { ForbiddenException, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { authenticator } from 'otplib';
import { Response } from "express";
import { toFileStream } from 'qrcode';

@Injectable()
export class TFAService{
    constructor (private user: UserService){}
    //  * Generates a random Base32 Secret Key.

    async tfaSecreteGenerate(_id: string){
        const user = await this.user.finduserById(_id);
        if (!user)
            throw new ForbiddenException ('Id not found in database');
        const secret = authenticator.generateSecret();
        const optPathUrl = authenticator.keyuri(user.email, process.env.APP_NAME, secret);
        this.user.setTfa(secret, _id);
        return {
            secret,
            optPathUrl
        }

    }
    async pipeQrCodeStream(stream: Response, optPathUrl: string){
        return toFileStream(stream, optPathUrl);
    }
}