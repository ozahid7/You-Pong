import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class isLoggedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = await context.switchToHttp().getRequest();
    const authCookie = (await request.cookies['access_token']);

    if (!authCookie) {
      return true;
    }
    
    try {
      const valid = await jwt.verify(authCookie, process.env.JWT_SECRET);
      if (!valid) 
        return true;
    } catch(error) {
        return true
    }
    const ressponse = await context.switchToHttp().getResponse();
    await ressponse.clearCookie('access_token');
    throw new ForbiddenException('You\'re already registred!');
  }
}