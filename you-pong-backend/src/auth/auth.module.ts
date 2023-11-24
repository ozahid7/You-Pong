import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { isLoggedGuard } from 'src/guards/isLoggedIn.guard';
import { FtStrategy, JwtStrategy, TfaStrategy } from './strategies';
import { AuthService, FtService, localService } from './services';
import { FindUserService, TfaUserService, UserService } from 'src/user/services';

@Module({
    imports: [JwtModule.register({
        secret : process.env.JWT_SECRET,
        global: true
    }), 
            PassportModule
            ],
    providers: [AuthService, localService, FtService, JwtStrategy, isLoggedGuard, TfaStrategy, UserService, TfaUserService, FindUserService, FtStrategy,
            ],
    exports: [AuthService, localService, FtService],
})

export class AuthModule {}
