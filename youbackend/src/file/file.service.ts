import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';

@Injectable()
export class FileService {
  async getFile(filename: string, res: Response) {
    const pathname = `./uploads/${filename}`;
    res.setHeader('Content-Disposition', `attachement; filename=${pathname}`);
    res.setHeader('Content-Type', 'Application/octet-stream');
    const file = createReadStream(pathname);
    file.pipe(res);
  }
}
