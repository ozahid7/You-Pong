import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChannelService } from './channel.service';
import { channelDto } from '../dto/channel.create.dto';
@Controller('chat/channel')
export class ChannelController {
  constructor(
    private prisma: PrismaService,
    private channelService: ChannelService,
  ) {}

  //Get MANY
  @Get()
  async getChannels() {
    try {
      const result = await this.channelService.getChannels();
      return result;
    } catch (error) {
      throw new HttpException('Failed to find a channel', 444);
    }
  }

  //Get
  @Get(':name')
  async getChannel(@Param('name') name: string) {
    try {
      const result = await this.channelService.getChannel(name);
      return result;
    } catch (error) {
      throw new HttpException('Failed to find a channel', 444);
    }
  }

  //POST MANY
  @Post('/many')
  async postChannels(@Body() channels: channelDto[]) {
    try {
      const result = await this.channelService.postChannels(channels);
      return result;
    } catch (error) {
      throw new HttpException('Failed to create channels', 444);
    }
  }

  //POST
  @Post()
  async postChannel(@Body() channel: channelDto) {
    try {
      const result = await this.channelService.postChannel(channel);
      return result;
    } catch (error) {
      throw new HttpException('Failed to create a channel', 443);
    }
  }

  //DELETE MANY
  @Delete()
  async deleteChannels() {
    try {
      const result = await this.channelService.deleteChannels();
      return result;
    } catch (error) {
      throw new HttpException('Failed to delete channels', 444);
    }
  }

  //DELETE
  @Delete(':name')
  async deleteChannel(@Param('name') name: string) {
    try {
      const result = await this.channelService.deleteChannel(name);
      return result;
    } catch (error) {
      throw new HttpException('Failed to delete a channel', 444);
    }
  }
}
