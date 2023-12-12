import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChannelService } from './channel.service';
import { channelDto } from '../dto/channel.create.dto';
import { Channel } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
@Controller('chat/channel')
export class ChannelController {
  constructor(
    private prisma: PrismaService,
    private channelService: ChannelService,
  ) {}

  //Get MANY
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getChannels(@Req() req) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.getChannels(id_user);
      return result;
    } catch (error) {
      throw new HttpException('Failed to find a channel', 444);
    }
  }

  //Get
  @UseGuards(AuthGuard('jwt'))
  @Get(':name')
  async getChannel(@Param('name') name: string) {
    try {
      const result = await this.channelService.getChannel(name);
      return result;
    } catch (error) {
      throw new HttpException('Failed to find a channel', 444);
    }
  }

  // //POST MANY
  // @Post('/many')
  // async postChannels(@Body() channels: channelDto[]) {
  //   try {
  //     const result = await this.channelService.postChannels(channels);
  //     return result;
  //   } catch (error) {
  //     throw new HttpException('Failed to create channels', 444);
  //   }
  // }

  //POST
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async postChannel(@Req() req, @Body() channel: channelDto) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.postChannel(channel, id_user);
      return result;
    } catch (error) {
      throw new HttpException('Failed to create a channel', 443);
    }
  }

  //DELETE MANY
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  @Delete(':name')
  async deleteChannel(@Param('name') name: string, @Req() req) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.deleteChannel(name);
      return result;
    } catch (error) {
      throw new HttpException('Failed to delete a channel', 444);
    }
  }

  //PUT MODIFY
  @UseGuards(AuthGuard('jwt'))
  @Put('/update/')
  async putChannel(@Query('name') name: string, @Body() channel: Channel) {
    try {
      const result = await this.channelService.putchannel(name, channel);
      return result;
    } catch (error) {
      throw new HttpException('Failed to update a channel', 444);
    }
  }

  //PUT JOIN
  @UseGuards(AuthGuard('jwt'))
  @Put('/join/')
  async putChannel_join(
    @Query('name') name: string,
    @Query('password') password: string,
    @Req() req,
  ) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.joinChannel(
        id_user,
        name,
        password,
      );
      return result;
    } catch (error) {
      throw new HttpException('Failed to join a channel', 444);
    }
  }
  //PUT LEAVE
  @UseGuards(AuthGuard('jwt'))
  @Put('/leave/')
  async putChannel_left(@Query('name') name: string, @Req() req) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.leaveChannel(id_user, name);
      return result;
    } catch (error) {
      throw new HttpException('Failed to leave a channel', 444);
    }
  }
  //PUT KICK
  @UseGuards(AuthGuard('jwt'))
  @Put('/kick/')
  async putChannel_kick(
    @Query('name') name: string,
    @Query('username') username: string,
    @Req() req,
  ) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.kickUser(
        id_user,
        username,
        name,
      );
      return result;
    } catch (error) {
      throw new HttpException('Failed to kick a member from channel', 444);
    }
  }

  //PUT ADMIN
  @UseGuards(AuthGuard('jwt'))
  @Put('/admin/')
  async putChannel_admin(
    @Query('name') name: string,
    @Query('username') username: string,
    @Req() req,
  ) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.setAdmin(
        id_user,
        username,
        name,
      );
      return result;
    } catch (error) {
      throw new HttpException('Failed to set a member as admin', 444);
    }
  }

  //PUT BAN
  @UseGuards(AuthGuard('jwt'))
  @Put('/ban/')
  async putChannel_ban(
    @Query('name') name: string,
    @Query('username') username: string,
    @Req() req,
  ) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.banMember(
        id_user,
        username,
        name,
      );
      return result;
    } catch (error) {
      throw new HttpException('Failed to ban a member', 444);
    }
  }

  //PUT UNBAN
  @UseGuards(AuthGuard('jwt'))
  @Put('/unban/')
  async putChannel_unban(
    @Query('name') name: string,
    @Query('username') username: string,
    @Req() req,
  ) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.unbanMember(
        id_user,
        username,
        name,
      );
      return result;
    } catch (error) {
      throw new HttpException('Failed to unban a member', 444);
    }
  }

  //PUT MUTE
  @UseGuards(AuthGuard('jwt'))
  @Put('/mute/')
  async putChannel_mute(
    @Query('name') name: string,
    @Query('username') username: string,
    @Query('time') muteTime: number,
    @Req() req,
  ) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.muteMember(
        id_user,
        username,
        name,
        muteTime,
      );
      return result;
    } catch (error) {
      throw new HttpException('Failed to mute a member', 444);
    }
  }

  //PUT UNMUTE
  @UseGuards(AuthGuard('jwt'))
  @Put('/unmute/')
  async putChannel_unmute(
    @Query('name') name: string,
    @Query('username') username: string,
    @Req() req,
  ) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.unmuteMember(
        id_user,
        username,
        name,
      );
      return result;
    } catch (error) {
      throw new HttpException('Failed to unmute a member', 444);
    }
  }
}
