import { Controller, Get, HttpException, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor(private gameService: GameService) {}

  //GET MANY
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMatchs(@Query('id_user') id_user: string) {
    try {
      const result = await this.gameService.getMatchs(id_user);
      return result;
    } catch (error) {
      throw new HttpException('Failed to get matchs', 444);
    }
  }
}
