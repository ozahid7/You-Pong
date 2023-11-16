import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { isLoggedGuard } from 'src/guards/isLoggedIn.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TfaStrategy } from './strategies/tfa.strategy';
// import { FtStrategy } from './strategies/ft.strategy';

@Module({
    imports: [JwtModule.register({
        secret : process.env.JWT_SECRET,
        global: true
    }), 
            PassportModule
            ],
    providers: [AuthService, UserService, JwtStrategy, isLoggedGuard, TfaStrategy]
})

export class AuthModule {
}
