import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { ChannelModule } from './chat/channel/channel.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './chat/room/room.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessageModule } from './chat/message/message.module';

@Module({
  imports: [
    ChatModule,
    ChannelModule,
    RoomModule,
    MessageModule,
    UserModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
