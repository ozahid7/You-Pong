import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { roomDto } from './room.create.dto';
import { userDto } from 'src/user/dto/user.create.dto';

export class messageDto {
  @IsString()
  @IsNotEmpty()
  content: string;
  created_at: Date;
  id_sender: userDto;
  id_room: roomDto;
}
