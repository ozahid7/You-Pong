import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ChatModule, PrismaModule, AuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
