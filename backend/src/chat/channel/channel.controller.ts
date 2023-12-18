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
import { ChannelService } from './channel.service';
import { channelDto } from '../dto/channel.create.dto';
import { Channel } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
@Controller('chat/channel')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  //Get MANY
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getChannels(@Req() req) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.getChannels(id_user);
      return result;
    } catch (error) {
      throw new HttpException('Failed to find channels', 444);
    }
  }

  //Get
  @UseGuards(AuthGuard('jwt'))
  @Get('/myChannel/:id_channel')
  async getChannel(@Param('id_channel') id_channel: string) {
    try {
      const result = await this.channelService.getChannel(id_channel);
      return result;
    } catch (error) {
      throw new HttpException('Failed to find a channel', 444);
    }
  }
  //Get
  @UseGuards(AuthGuard('jwt'))
  @Get('/members/')
  async getMembers(@Query('id_channel') id_channel: string, @Req() req) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.getMembers(id_user, id_channel);
      return result;
    } catch (error) {
      throw new HttpException('Failed to find members of channel', 444);
    }
  }

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

  //POST DIRECT
  @UseGuards(AuthGuard('jwt'))
  @Post('/direct/')
  async postChannelDirect(@Req() req, @Query('username') username: string) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.postChannelDirect(
        id_user,
        username,
      );
      return result;
    } catch (error) {
      throw new HttpException('Failed to create a direct channel', 443);
    }
  }

  //DELETE DIRECT
  @UseGuards(AuthGuard('jwt'))
  @Delete('/direct/')
  async deleteChannelDirect(@Req() req, @Query('username') username: string) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.deleteChannelDirect(
        id_user,
        username,
      );
      return result;
    } catch (error) {
      throw new HttpException('Failed to delete a direct channel', 443);
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
  @Delete(':id_channel')
  async deleteChannel(@Param('id_channel') id_channel: string, @Req() req) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.deleteChannel(id_channel);
      return result;
    } catch (error) {
      throw new HttpException('Failed to delete a channel', 444);
    }
  }

  //PUT MODIFY
  @UseGuards(AuthGuard('jwt'))
  @Put('/update/')
  async putChannel(
    @Query('id_channel') id_channel: string,
    @Body() channel: Channel,
  ) {
    try {
      const result = await this.channelService.putchannel(id_channel, channel);
      return result;
    } catch (error) {
      throw new HttpException('Failed to update a channel', 444);
    }
  }

  //PUT JOIN
  @UseGuards(AuthGuard('jwt'))
  @Put('/join/')
  async putChannel_join(
    @Query('id_channel') id_channel: string,
    @Query('password') password: string,
    @Req() req,
  ) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.joinChannel(
        id_user,
        id_channel,
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
  async putChannel_left(@Query('id_channel') id_channel: string, @Req() req) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.leaveChannel(
        id_user,
        id_channel,
      );
      return result;
    } catch (error) {
      throw new HttpException('Failed to leave a channel', 444);
    }
  }

  //PUT KICK
  @UseGuards(AuthGuard('jwt'))
  @Put('/kick/')
  async putChannel_kick(
    @Query('id_channel') id_channel: string,
    @Query('username') username: string,
    @Req() req,
  ) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.kickUser(
        id_user,
        username,
        id_channel,
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
    @Query('id_channel') id_channel: string,
    @Query('username') username: string,
    @Req() req,
  ) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.setAdmin(
        id_user,
        username,
        id_channel,
      );
      return result;
    } catch (error) {
      throw new HttpException('Failed to set a member as admin', 444);
    }
  }

  //PUT MEMBER
  @UseGuards(AuthGuard('jwt'))
  @Put('/member/')
  async putChannel_member(
    @Query('id_channel') id_channel: string,
    @Query('username') username: string,
    @Req() req,
  ) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.setMember(
        id_user,
        username,
        id_channel,
      );
      return result;
    } catch (error) {
      throw new HttpException('Failed to set admin as a member', 444);
    }
  }

  //PUT BAN
  @UseGuards(AuthGuard('jwt'))
  @Put('/ban/')
  async putChannel_ban(
    @Query('id_channel') id_channel: string,
    @Query('username') username: string,
    @Req() req,
  ) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.banMember(
        id_user,
        username,
        id_channel,
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
    @Query('id_channel') id_channel: string,
    @Query('username') username: string,
    @Req() req,
  ) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.unbanMember(
        id_user,
        username,
        id_channel,
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
    @Query('id_channel') id_channel: string,
    @Query('username') username: string,
    @Query('time') muteTime: number,
    @Req() req,
  ) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.muteMember(
        id_user,
        username,
        id_channel,
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
    @Query('id_channel') id_channel: string,
    @Query('username') username: string,
    @Req() req,
  ) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.channelService.unmuteMember(
        id_user,
        username,
        id_channel,
      );
      return result;
    } catch (error) {
      throw new HttpException('Failed to unmute a member', 444);
    }
  }
}
