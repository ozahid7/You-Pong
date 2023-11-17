import {
  Controller,
  HttpException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}
  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.uploadService.uploadFile(file);
      return result;
    } catch (error) {
      throw new HttpException('Failed to upload a file', 555);
    }
  }
}
