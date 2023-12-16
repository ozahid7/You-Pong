import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { achCreateDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('achievement')
export class AchievementController {
  constructor(private achService: AchievementService) {}
  // @UseGuards(AuthGuard('jwt'))
  // @Post('create')
  // setAchievement(@Body() dto: achCreateDto){
  //     return this.achService.setAchievement(dto);
  // }
}
