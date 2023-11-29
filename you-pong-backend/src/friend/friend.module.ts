import { Module } from '@nestjs/common';
import { friendController } from './friend.controller';
import { friendService } from './friend.service';

@Module({
    controllers: [friendController],
    providers: [friendService]
})
export class friendModule{}