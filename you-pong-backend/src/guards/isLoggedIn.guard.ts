import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class isLoggedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const authHead = (await request.headers['Authorization']);

    if (!authHead) {
      return true;
    }

    const token = authHead.replace('Bearer ', '');    
    
    try {
      const valid = jwt.verify(token, process.env.JWT_SECRET);
      if (!valid) 
        return true;
    } catch(error) {
        return true
    }
    throw new ForbiddenException('You\'re already registred!');
  }
}
