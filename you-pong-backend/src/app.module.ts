import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { TFAService } from './auth/auth.tfa.service';


@Module({
  imports: [ChatModule, PrismaModule, AuthModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, TFAService],
})
export class AppModule {}
