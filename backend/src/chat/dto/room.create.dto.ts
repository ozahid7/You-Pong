import { userDto } from '../../user/dto/user.create.dto';
import { channelDto } from './channel.create.dto';
import { messageDto } from './message.create.dto';

export class roomDto {
  user_role: 'ADMIN' | 'OWNER' | 'MEMBER';
  member_status: 'MUTED' | 'BANNED' | 'NONE';
  time_muted?: Date;
  joined_at: Date;
  lefted_at?: Date;
  lefted?: Boolean;
  blocked_users?: userDto[];
  id_user: userDto;
  id_channel: channelDto;
  messages?: messageDto[];
}
