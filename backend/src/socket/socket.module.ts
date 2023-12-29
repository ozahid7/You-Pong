import { Module } from '@nestjs/common';
import { SocketService } from './socket/socket.service';
import { FindUserService } from 'src/user/services';

@Module({
  providers: [SocketService, FindUserService],
})
export class SocketModule {}
