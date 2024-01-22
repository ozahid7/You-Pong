import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { roomDto } from '../../chat/dto/room.create.dto';
import { channelDto } from 'src/chat/dto/channel.create.dto';

export class userDto {
  @IsString()
  @IsNotEmpty()
  id_user: string;
  @IsNotEmpty()
  @IsString()
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
  rank: 'PANDORA' | 'BIOS' | 'FREAX' | 'COMMODORE';
  status: 'ONLINE' | 'OFFLINE' | 'INGAME';
  created_at: Date;
  updated_at: Date;
  rooms?: roomDto[];
  blocked?: roomDto[];
  channels?: channelDto[];
}
