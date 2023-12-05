import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MessageModule } from './message/message.module';
import { RoomModule } from './room/room.module';
import { ChannelModule } from './channel/channel.module';

@Module({
  providers: [ChatService],
  controllers: [ChatController],
  imports: [MessageModule, RoomModule, ChannelModule],
})
export class ChatModule {}
