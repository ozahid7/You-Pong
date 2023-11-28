import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {Socket} from 'socket.io'
import { Observable } from 'rxjs';

@Injectable()
export class WsJwtGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean> {
    if (context.getType() !== 'ws') {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authCookie = (await request.cookies['access_token']);
    console.log(authCookie);
    
    const client: Socket = context.switchToWs().getClient();
    return false;
  }
}
