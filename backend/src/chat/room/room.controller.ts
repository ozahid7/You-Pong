import {
  Controller,
  HttpException,
  Post,
  Param,
  Query,
  Delete,
  Get,
  Put,
} from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('chat/room')
export class RoomController {
  constructor(
    private roomService: RoomService,
  ) {}

  //Post
  @Post()
  async postRoom(
    @Query('id_friend') id_friend: string,
    @Query('id_channel') id_channel: string,
    @Query('room_name') room_name: string,
  ) {
    try {
      const result = await this.roomService.postRoom(
        id_friend,
        room_name,
        id_channel,
      );
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
  @Delete(':name')
  async deleteRoom(@Param('name') name: string) {
    try {
      const result = await this.roomService.deleteRoom(name);
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
  @Get(':name')
  async getRoom(@Param('name') name: string) {
    try {
      const result = await this.roomService.getRoom(name);
      return result;
    } catch (error) {
      throw new HttpException('Failed to get a room', 405);
    }
  }

  //PUT
  @Put(':name')
  async putRoom(@Param('name') name: string) {
    try {
      const result = await this.roomService.putRoom(name);
      return result;
    } catch (error) {
      throw new HttpException('Failed to update a room', 406);
    }
  }
}
