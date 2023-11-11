import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class isLoggedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Retrieve the value of the 'your-header-name' header
    const token = await request.headers['Authorization'];
    
    console.log(token);
    try {
      jwt.verify(token, process.env.JWT_SECRET)
    } catch(error) {
      throw new ForbiddenException('You\'re already registred!')
    }
    return false;
  }
}