import {
  Controller,
  Get,
  HttpException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('achievement')
export class AchievementController {
  constructor(private achService: AchievementService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAchievements(@Query('id_user') id_user: string) {
    try {
      return await this.achService.getAchievements(id_user);
    } catch (error) {
      throw new HttpException('Failed to get achievements', 444);
    }
  }
}
