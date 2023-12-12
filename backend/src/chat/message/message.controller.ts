import {
  Body,
  Controller,
  HttpException,
  Post,
  Get,
  Delete,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageService } from './message.service';
import { messageDto } from '../dto/message.create.dto';
import { AuthGuard } from '@nestjs/passport';
import { SocketService } from './socket.service';
import { JsonObject } from '@prisma/client/runtime/library';

export interface nameChannel {
  name: string;
}

@Controller('chat/message')
export class MessageController {
  constructor(
    private prisma: PrismaService,
    private messageService: MessageService,
    private socketService: SocketService,
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
  async getMessages(@Body() name: nameChannel, @Req() req) {
    try {
      const id_user = req.user.sub;
      const result = await this.messageService.getMessages(name.name, id_user);
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