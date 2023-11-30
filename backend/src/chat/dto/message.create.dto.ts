import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { roomDto } from './room.create.dto';

export class messageDto {
  @IsString()
  @IsNotEmpty()
  content: string;
  created_at: Date;
  id_room: roomDto;
}
