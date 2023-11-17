import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File) {
    if (!existsSync('./uploads')) {
      mkdirSync('./uploads');
    }
    const time = new Date().getTime();
    const filename = `${time}_${file.originalname}`;
    const path = `./uploads/${filename}`;
    const fileStream = createWriteStream(path);
    if (existsSync(path)) console.log('file already existe');
    await fileStream.write(file.buffer);
    fileStream.end();
    return filename;
  }
}
