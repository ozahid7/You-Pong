import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class isLoggedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = await request.headers['authorization'];

    if (!token) {
      true;
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      // return true;
    } catch(error) {
        return true
    }
    throw new ForbiddenException('You\'re already registred!');
  }
}