import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
