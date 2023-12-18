import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelUpdateService } from './channel.update.service';
import { ChannelController } from './channel.controller';

@Module({
  providers: [ChannelService, ChannelUpdateService],
  controllers: [ChannelController],
})
export class ChannelModule {}
