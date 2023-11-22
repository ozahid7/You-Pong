import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { FindUserService, TfaUserService, UserService } from './services';
import { AuthService } from 'src/auth/services';
import { AuthController } from 'src/auth/auth.controller';


@Module({
  imports: [JwtModule.register({
    secret : process.env.TFA_JWT_SECRET,
    global: true
  })], 
  providers: [UserService, TfaUserService, FindUserService, AuthService],
  exports: [UserService, TfaUserService, FindUserService]
})
export class UserModule {}
