import { IsUnique } from '@youba/nestjs-dbvalidator';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEmail,
  Validate,
  IsOptional,
} from 'class-validator';
import { roomDto } from '../../chat/dto/room.create.dto';
import { channelDto } from 'src/chat/dto/channel.create.dto';

export class userDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsUnique, [{ table: 'user', column: 'id_user' }])
  id_user: String;
  @IsNotEmpty()
  @IsString()
  @Validate(IsUnique, [{ table: 'user', column: 'username' }])
  username: string;
  @IsNotEmpty()
  @IsString()
  firstname: string;
  @IsNotEmpty()
  @IsString()
  lastname: string;
  @IsNotEmpty()
  @IsString()
  avatar: string;
  @IsNotEmpty()
  @IsString()
  hash: string;
  @IsNotEmpty()
  @IsEmail()
  @Validate(IsUnique, [{ table: 'user', column: 'email' }])
  email: string;
  @IsNotEmpty()
  @IsString()
  two_fact_auth: string;
  @IsNotEmpty()
  @IsString()
  jw_token: string;
  @IsOptional()
  @IsNumber()
  victory: number;
  @IsOptional()
  @IsNumber()
  defeats: number;
  @IsOptional()
  @IsNumber()
  level: number;
  @IsOptional()
  @IsNumber()
  rank: number;
  status: 'ONLINE' | 'OFFLINE' | 'INGAME';
  created_at: Date;
  updated_at: Date;
  // rooms?: roomDto[];
  // blocked: roomDto[];
  // channels: channelDto[];
}
