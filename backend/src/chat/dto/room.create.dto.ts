import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { userDto } from '../../user/dto/user.create.dto';
import { channelDto } from './channel.create.dto';
import { messageDto } from './message.create.dto';

export class roomDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  user_role: 'ADMIN' | 'OWNER' | 'MEMBER';
  member_status?: 'MUTED' | 'BANNED';
  time_muted?: Date;
  joined_at: Date;
  lefted_at?: Date;
  blocked_users?: userDto[];
  id_user: userDto;
  id_channel: channelDto;
  messages?: messageDto[];
}
