import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { userDto } from 'src/user/dto/user.create.dto';
import { roomDto } from './room.create.dto';

export class channelDto {
  @IsString()
  @IsNotEmpty()
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
  users?: userDto[];
  rooms?: roomDto[];
}
