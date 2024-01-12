import { Controller, Get, Post, Req, Res, UseFilters, UseGuards } from "@nestjs/common";
import { FtService, TfaAuthService } from "./services";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from 'express';
import { FtExceptionFilter } from "./filters/ft.filter";
import { isLoggedGuard } from "./guards";

@UseFilters(FtExceptionFilter)
@UseGuards(isLoggedGuard)
@Controller('42')
export class FtController {
    constructor(
        private ftService: FtService,
        private TfaAuthService: TfaAuthService,    
    ) {}
    @Post('')
    @UseGuards(AuthGuard('42'))
    ftAuth(@Req() req: Request) {}
  
    @Get('/callback')
    @UseGuards(AuthGuard('42'))
    async ftCall(@Res() res: Response, @Req() req: Request) {
      this.ftAuth(req);
      await this.ftService.ftSignIn(res, req, req['id_user']);
    }
}
