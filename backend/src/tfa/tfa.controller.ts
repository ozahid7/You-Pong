import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TfaAuthService } from "src/auth/services";
import { Request, Response } from 'express';

@Controller('tfa')
export class TfaController {
    constructor(private TfaAuthService: TfaAuthService) {}

    @UseGuards(AuthGuard('tfa'))
    @Get('/getTfaStatus/')
    async getTfaStatus(@Req() req, @Res() res: Response) {
        const _id = req.user.sub;
        res.status(200).json(await this.TfaAuthService.getTfaStatus(_id));
    }
}
