import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { roomDto } from './room.create.dto';
import { IsUnique } from '@youba/nestjs-dbvalidator';

export class messageDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsUnique, [{ table: 'message', column: 'id_message' }])
  id_message: string;
  @IsString()
  @IsNotEmpty()
  content: string;
  created_at: Date;
  id_room: roomDto;
}
