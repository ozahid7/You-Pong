import { Module, OnModuleInit } from '@nestjs/common';
import { SocketService } from './socket/socket.service';

@Module({
  providers: [SocketService],
})
export class SocketModule {}
