import { IsUnique } from '@youba/nestjs-dbvalidator';
import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { userDto } from 'src/user/dto/user.create.dto';
import { roomDto } from './room.create.dto';

export class channelDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsUnique, [{ table: 'channel', column: 'id_channel' }])
  id_channel: string;
  @IsString()
  @IsNotEmpty()
  @Validate(IsUnique, [{ table: 'channel', column: 'name' }])
  name: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsOptional()
  @IsString()
  avatar?: string;
  @IsOptional()
  @IsString()
  hash?: string;
  type: 'DIRECT' | 'PUBLIC' | 'PRIVATE' | 'PROTECTED';
  created_at: Date;
  updated_at: Date;
  users: userDto[];
  rooms: roomDto[];
}
