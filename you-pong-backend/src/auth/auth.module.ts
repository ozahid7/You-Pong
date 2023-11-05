import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies';

@Module({
    imports: [JwtModule.register({
        secret : process.env.JWT_SECRET,
        global: true
    }), PassportModule],
    providers: [AuthService, JwtService, JwtStrategy]
})
export class AuthModule {
}
