import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { SocketService } from './socket.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, SocketService]
})
export class MessageModule {}
