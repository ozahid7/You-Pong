import { Controller, Get, HttpException, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}
  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const result = await this.fileService.getFile(filename, res);
      return result;
    } catch (error) {
      throw new HttpException('Failed to get a file', 450);
    }
  }
}
