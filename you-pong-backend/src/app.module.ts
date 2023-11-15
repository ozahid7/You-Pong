import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ChannelModule } from './chat/channel/channel.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './chat/room/room.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessageModule } from './chat/message/message.module';
import { SocketModule } from './socket/socket.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';


@Module({
  imports: [
    ChatModule,
    ChannelModule,
    RoomModule,
    MessageModule,
   
    PrismaModule, AuthModule, UserModule,
    SocketModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
