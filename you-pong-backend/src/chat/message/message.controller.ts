import {
  Body,
  Controller,
  HttpException,
  Post,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageService } from './message.service';
import { messageDto } from '../dto/message.create.dto';

@Controller('message')
export class MessageController {
  constructor(
    private prisma: PrismaService,
    private messageService: MessageService,
  ) {}

  //POST MANY
  @Post()
  async postMessages(@Body() message: messageDto[]) {
    try {
      const result = await this.messageService.postMessages(message);
      return result;
    } catch (error) {
      throw new HttpException('Failed to create messages', 403);
    }
  }
  //POST
  @Post()
  async postMessage(@Body() message: messageDto) {
    try {
      const result = await this.messageService.postMessage(message);
      return result;
    } catch (error) {
      throw new HttpException('Failed to create a message', 403);
    }
  }

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
  @Get()
  async getMessages() {
    try {
      const result = await this.messageService.getMessages();
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
