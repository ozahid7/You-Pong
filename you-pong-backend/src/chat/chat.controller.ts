import { Controller } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(
    private prisma: PrismaService,
    private chatService: ChatService,
  ) {}
}
