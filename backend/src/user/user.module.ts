import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FindUserService, InfoUserService, TfaUserService, UserService } from './services';
import { AuthService } from 'src/auth/services';
import { AchievementService } from 'src/achievement/achievement.service';
import { UserController } from './user.controller';
import { UpdateService } from './services/update.service';


@Module({
  imports: [JwtModule.register({
    secret : process.env.TFA_JWT_SECRET,
    global: true
  })], 
  providers: [UserService, TfaUserService, FindUserService, AuthService, InfoUserService, AchievementService, UpdateService],
  exports: [UserService, TfaUserService, FindUserService, InfoUserService, InfoUserService],
  controllers: [UserController]
})
export class UserModule {}
