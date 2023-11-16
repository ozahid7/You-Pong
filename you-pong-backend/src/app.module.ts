import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ChannelModule } from './chat/channel/channel.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './chat/room/room.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessageModule } from './chat/message/message.module';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ChatModule,
    ChannelModule,
    RoomModule,
    MessageModule,
    PrismaModule,
    AuthModule,
    UserModule,
    SocketModule,
    UploadModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
