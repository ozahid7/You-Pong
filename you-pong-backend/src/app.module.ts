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
import { UploadModule } from './upload/upload.module';
import { FileModule } from './file/file.module';
import { AuthService, FtService, TfaAuthService, localService } from './auth/services';
import { FindUserService, InfoUserService, TfaUserService } from './user/services';
import { UserController } from './user/user.controller';
import { AchievementController } from './achievement/achievement.controller';
import { AchievementModule } from './achievement/achievement.module';
import { AchievementService } from './achievement/achievement.service';
import { achievUserService } from './user/services/achievemennt.service';
import { JwtStrategy } from './auth/strategies';

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
    FileModule,
    AchievementModule,
  ],
  controllers: [AuthController, UserController, AchievementController],
  providers: [AuthService,
              FtService,
              localService,
              TfaAuthService,
              TfaUserService,
              FindUserService,
              InfoUserService,
              AchievementService,
              achievUserService,
              JwtStrategy,
  ]
})
export class AppModule {}
