import {
  ForbiddenException,
  Injectable,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { localDto } from '../dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { Response } from 'express';
import {
  FindUserService,
  TfaUserService,
  UserService,
} from 'src/user/services';

@Injectable()
export class localService {
  constructor(
    private authService: AuthService,
    private user: UserService,
    private tfaUserService: TfaUserService,
    private findUser: FindUserService,
  ) {}
  async localSignUp(dto: localDto) {
    // create hashed password;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);
    // create new user
    return await this.user.create({
      email: dto.email,
      hash,
      username: 'You-Pong',
      avatar: 'http://localhost:4000/file/avatar.jpeg',
    });
  }

  async localSignIn(@Res() res: Response, dto: localDto) {
    // get the user object
    const user = await this.findUser.finduserByEmail(dto.email);
    if (!user) throw new ForbiddenException('Email not found in database');
    // check for password
    const cmp = await bcrypt.compare(dto.password, user.hash);
    if (!cmp) throw new UnauthorizedException('Uncorrect password');
    // get user's tfa status
    const tfaStatus = await this.tfaUserService.getTfaStatus(user);
    // generate access Cookie
    if (tfaStatus == false)
      await this.authService.genCookie(res, user.id_user, 'access_token');
    // generate tfa Cookie
    else await this.authService.genCookie(res, user.id_user, 'tfa');
    return res.status(201).json({ tfaStatus });
  }
}
