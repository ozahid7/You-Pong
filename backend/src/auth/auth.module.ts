import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { isLoggedGuard } from 'src/guards/isLoggedIn.guard';
import { FtStrategy, JwtStrategy, TfaStrategy } from './strategies';
import {
  AuthService,
  FtService,
  TfaAuthService,
  localService,
} from './services';
import {
  FindUserService,
  TfaUserService,
  UserService,
} from 'src/user/services';
import { AuthController } from './auth.controller';
import { AchievementService } from 'src/achievement/achievement.service';
import { FtController } from './ft.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
    }),
    PassportModule,
  ],
  providers: [
    AuthService,
    localService,
    FtService,
    JwtStrategy,
    isLoggedGuard,
    TfaStrategy,
    UserService,
    TfaUserService,
    FindUserService,
    FtStrategy,
    TfaAuthService,
    AchievementService,
  ],
  exports: [AuthService, localService, FtService, TfaAuthService],
  controllers: [AuthController, FtController],
})
export class AuthModule {}
