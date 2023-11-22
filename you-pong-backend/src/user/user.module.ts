import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { FindUserService, InfoUserService, TfaUserService, UserService } from './services';
import { AuthService } from 'src/auth/services';


@Module({
  imports: [JwtModule.register({
    secret : process.env.TFA_JWT_SECRET,
    global: true
  })], 
  providers: [UserService, TfaUserService, FindUserService, AuthService, InfoUserService],
  exports: [UserService, TfaUserService, FindUserService, InfoUserService]
})
export class UserModule {}
