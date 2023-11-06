import {
  Controller,
  HttpException,
  Post,
  Param,
  Query,
  Delete,
  Get,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomService } from './room.service';

@Controller('chat/room')
export class RoomController {
  constructor(
    private prisma: PrismaService,
    private roomService: RoomService,
  ) {}

  //Post
  @Post()
  async postRoom(
    @Query('username') username: string,
    @Query('name') name: string,
  ) {
    try {
      const result = await this.roomService.postRoom(username, name);
      return result;
    } catch (error) {
      throw new HttpException('Failed to create a room', 405);
    }
  }

  //DELETE MANY
  @Delete()
  async deleteRooms() {
    try {
      const result = await this.roomService.deleteRooms();
      return result;
    } catch (error) {
      throw new HttpException('Failed to delete rooms', 405);
    }
  }

  //DELETE
  @Delete(':id_room')
  async deleteRoom(@Param('id_room') id_room: string) {
    try {
      const result = await this.roomService.deleteRoom(id_room);
      return result;
    } catch (error) {
      throw new HttpException('Failed to delete a room', 405);
    }
  }

  //GET MANY
  @Get()
  async getRooms() {
    try {
      const result = await this.roomService.getRooms();
      return result;
    } catch (error) {
      throw new HttpException('Failed to get rooms', 405);
    }
  }

  //GET
  @Get(':id_room')
  async getRoom(@Param('id_room') id_room: string) {
    try {
      const result = await this.roomService.getRoom(id_room);
      return result;
    } catch (error) {
      throw new HttpException('Failed to get a room', 405);
    }
  }
}
