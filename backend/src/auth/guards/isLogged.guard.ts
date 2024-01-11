import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class isLoggedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const authCookie = (await request.cookies['access_token']);

    if (!authCookie) {
      return true;
    }
    
    try {
      const valid = jwt.verify(authCookie, process.env.JWT_SECRET);
      if (!valid) 
        return true;
    } catch(error) {
        return true
    }
    // const response = context.switchToHttp().getResponse();
    // response.clearCookie('access_token');
    
    throw new ForbiddenException('You\'re already registred!');
  }
}