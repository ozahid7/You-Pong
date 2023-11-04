import { IsUnique } from '@youba/nestjs-dbvalidator';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';

export class messageDto {
  @IsNotEmpty()
  @IsUUID()
  id_channel: String;
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
}
