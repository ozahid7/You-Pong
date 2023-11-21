import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [JwtModule.register({
    secret : process.env.TFA_JWT_SECRET,
    global: true
  })], 
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
