import { Controller, Get, Req, Res, UseFilters, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TfaAuthService } from "src/auth/services";
import { Request, Response } from 'express';
import { TfaUserService } from "src/user/services";
import { TfaExceptionFilter } from "./tfa.filter";

@Controller('tfa')
export class TfaController {
    constructor(private TfaUserService: TfaUserService) {}

    @UseFilters(TfaExceptionFilter)
    @UseGuards(AuthGuard('tfa'))
    @Get('/getTfaStatus/')
    async getTfaStatus(@Req() req, @Res() res: Response) {
        const _id = req.user.sub;
        res.status(200).json({message: 'True'});
    }
}
