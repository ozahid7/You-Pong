import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ChannelModule } from './chat/channel/channel.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './chat/room/room.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessageModule } from './chat/message/message.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { FileModule } from './file/file.module';
import { AchievementModule } from './achievement/achievement.module';
import { FriendModule } from './friend/friend.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    ChatModule,
    ChannelModule,
    RoomModule,
    MessageModule,
    PrismaModule,
    AuthModule,
    UserModule,
    UploadModule,
    FileModule,
    AchievementModule,
    FriendModule,
    SocketModule
  ],
})
export class AppModule {}
