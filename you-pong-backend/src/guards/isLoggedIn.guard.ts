import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class isLoggedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Retrieve the value of the 'your-header-name' header
    const token = request.headers['Authorization'];
    
    console.log(token);
    try {
      jwt.verify(token, process.env.JWT_SECRET)
    } catch(error) {
      throw Error('awdii')
    }
    return false;
  }
}