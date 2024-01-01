import { Module } from '@nestjs/common';
import { SocketService } from './socket/socket.service';
import { FindUserService } from 'src/user/services';
import { GameService } from 'src/game/game.service';

@Module({
  providers: [SocketService, FindUserService, GameService],
})
export class SocketModule {}
