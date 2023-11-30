import { Module, OnModuleInit } from '@nestjs/common';
import { SocketService } from './socket/socket.service';
import { FindUserService } from 'src/user/services';
import { JwtStrategy } from 'src/auth/strategies';

@Module({
  providers: [SocketService, FindUserService],
})
export class SocketModule {}
