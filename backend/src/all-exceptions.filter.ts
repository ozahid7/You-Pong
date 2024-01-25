import { ExceptionFilter, Catch, ArgumentsHost, HttpException, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';

@Catch(InternalServerErrorException)
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .clearCookie('_intra_42_session_production')
      .clearCookie('access_token')
      .status(201)
      .redirect(`http://${process.env.HOST_IP}:${process.env.FRONT_PORT}/`)
    }
}
