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
  async getAchievements(@Query('username') username: string) {
    try {
      return await this.achService.getAchievements(username);
    } catch (error) {
      throw new HttpException('Failed to get achievements', 455);
    }
  }
}
