import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { FtStrategy, JwtStrategy } from './strategies';
import { UserService } from 'src/user/user.service';
import { isLoggedGuard } from 'src/guards/isLoggedIn.guard';
// import { FtStrategy } from './strategies/ft.strategy';

@Module({
    imports: [JwtModule.register({
        secret : process.env.JWT_SECRET,
        global: true
    }), 
            PassportModule
            ],
    providers: [AuthService, JwtService, JwtStrategy, FtStrategy, UserService, isLoggedGuard]
})

export class AuthModule {
}
