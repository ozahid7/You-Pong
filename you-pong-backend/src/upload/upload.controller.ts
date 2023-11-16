import {
  Controller,
  HttpException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!existsSync('./uploads')) {
        mkdirSync('./uploads');
      }
      const time = new Date().getTime();
      const path = `./uploads/${time}_${file.originalname}`;
      const fileStream = createWriteStream(path);
      if (existsSync(path)) console.log('file already existe');
      fileStream.write(file.buffer);
      fileStream.end();
    } catch (error) {
      throw new HttpException('Failed to upload a file', 502);
    }
  }
}
