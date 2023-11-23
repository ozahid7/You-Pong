import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FindUserService, InfoUserService, TfaUserService, UserService } from './services';
import { AuthService } from 'src/auth/services';
import { achievUserService } from './services/achievemennt.service';
import { AchievementService } from 'src/achievement/achievement.service';


@Module({
  imports: [JwtModule.register({
    secret : process.env.TFA_JWT_SECRET,
    global: true
  })], 
  providers: [UserService, TfaUserService, FindUserService, AuthService, InfoUserService, achievUserService, AchievementService],
  exports: [UserService, TfaUserService, FindUserService, InfoUserService, achievUserService]
})
export class UserModule {}
