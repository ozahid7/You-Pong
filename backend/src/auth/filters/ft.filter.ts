
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, ForbiddenException, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(ForbiddenException)
export class FtExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .clearCookie('_intra_42_session_production')
      .clearCookie('access_token')
      .status(200)
      .redirect(`http://${process.env.HOST_IP}:${process.env.FRONT_PORT}/`)
    }
}
