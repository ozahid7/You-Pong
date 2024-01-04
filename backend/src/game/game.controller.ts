import {
  Controller,
  Get,
  HttpException,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  //GET MANY
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMatchs(@Query('id_user') id_user: string, @Req() req) {
    try {
      const _id: string = req.user.sub;
      const result = await this.gameService.getMatchs(id_user, _id);
      return result;
    } catch (error) {
      throw new HttpException('Failed to get matchs', 444);
    }
  }
}
