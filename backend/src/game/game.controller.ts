import { Controller, Get, HttpException, Req, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  //GET MANY
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMatchs(@Req() req) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.gameService.getMatchs(id_user);
      return result;
    } catch (error) {
      throw new HttpException('Failed to get matchs', 444);
    }
  }
}