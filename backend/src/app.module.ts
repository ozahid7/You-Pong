import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ChannelModule } from './chat/channel/channel.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessageModule } from './chat/message/message.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { FileModule } from './file/file.module';
import { AchievementModule } from './achievement/achievement.module';
import { FriendModule } from './friend/friend.module';
import { SocketModule } from './socket/socket.module';
import { GameModule } from './game/game.module';
import { TfaModule } from './tfa/tfa.module';

@Module({
  imports: [
    ChatModule,
    ChannelModule,
    MessageModule,
    PrismaModule,
    AuthModule,
    UserModule,
    UploadModule,
    FileModule,
    AchievementModule,
    FriendModule,
    SocketModule,
    GameModule,
    TfaModule,
  ],
})
export class AppModule {}
