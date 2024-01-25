import { Module } from '@nestjs/common';
import { SocketService } from './socket/socket.service';
import { FindUserService } from 'src/user/services';
import { GameService } from 'src/game/game.service';
import { SocketMethodes } from './socket/socket.methodes';

@Module({
  providers: [SocketService, FindUserService, GameService, SocketMethodes],
})
export class SocketModule {}
