import {
  Controller,
  HttpException,
  Get,
  Delete,
  Param,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthGuard } from '@nestjs/passport';

export interface nameChannel {
  name: string;
}

@Controller('chat/message')
export class MessageController {
  constructor(
    private messageService: MessageService,
  ) {}

  //DELETE MANY
  @Delete()
  async deleteMessages() {
    try {
      const result = await this.messageService.deleteMessages();
      return result;
    } catch (error) {
      throw new HttpException('Failed to delete messages', 444);
    }
  }

  //DELETE CHANNEL MANY
  @Delete()
  async deleteChannelMessages(@Query('id_channel') id_channel: string) {
    try {
      const result =
        await this.messageService.deleteChannelMessages(id_channel);
      return result;
    } catch (error) {
      throw new HttpException('Failed to delete channel messages', 444);
    }
  }
  //DELETE
  @Delete(':id_message')
  async deleteMessage(@Param('id_message') id_message: string) {
    try {
      const result = await this.messageService.deleteMessage(id_message);
      return result;
    } catch (error) {
      throw new HttpException('Failed to delete a message', 444);
    }
  }

  //GET MANY
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMessages(@Query('id_channel') id_channel: string, @Req() req) {
    try {
      const id_user = req.user.sub;
      const result = await this.messageService.getMessages(id_channel, id_user);
      return result;
    } catch (error) {
      throw new HttpException('Failed to find messages', 444);
    }
  }
  //GET
  @Get(':id_message')
  async getMessage(@Param('id_message') id_message: string) {
    try {
      const result = await this.messageService.getMessage(id_message);
      return result;
    } catch (error) {
      throw new HttpException('Failed to find a message', 444);
    }
  }
}
