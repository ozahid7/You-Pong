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

  //POST MANY
  // @UseGuards(AuthGuard('jwt'))
  // @Post()
  // async postMessages(@Body() name: string, message: messageDto[], @Req() req) {
  //   try {
  //     const id_user = req.user.sub;
  //     const result = await this.messageService.postMessages(
  //       name,
  //       message,
  //       id_user,
  //     );
  //     return result;
  //   } catch (error) {
  //     throw new HttpException('Failed to create messages', 403);
  //   }
  // }
  //POST
  // @UseGuards(AuthGuard('jwt'))
  // @Post()
  // async postMessage(@Body() name: string, message: messageDto, @Req() req) {
  //   try {
  //     const id_user = req.user.sub;
  //     const result = await this.messageService.postMessage(
  //       name,
  //       message,
  //       id_user,
  //     );
  //     return result;
  //   } catch (error) {
  //     throw new HttpException('Failed to create a message', 403);
  //   }
  // }

  //DELETE MANY
  @Delete()
  async deleteMessages() {
    try {
      const result = await this.messageService.deleteMessages();
      return result;
    } catch (error) {
      throw new HttpException('Failed to delete messages', 403);
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
      throw new HttpException('Failed to delete channel messages', 403);
    }
  }
  //DELETE
  @Delete(':id_message')
  async deleteMessage(@Param('id_message') id_message: string) {
    try {
      const result = await this.messageService.deleteMessage(id_message);
      return result;
    } catch (error) {
      throw new HttpException('Failed to delete a message', 403);
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
      throw new HttpException('Failed to find messages', 403);
    }
  }
  //GET
  @Get(':id_message')
  async getMessage(@Param('id_message') id_message: string) {
    try {
      const result = await this.messageService.getMessage(id_message);
      return result;
    } catch (error) {
      throw new HttpException('Failed to find a message', 403);
    }
  }
}
