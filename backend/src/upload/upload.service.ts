import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File | null) {
    let path = `./DefaultImages/groups.png`;
    let filename = `groups.png`;
    if (file && file !== undefined) {
      if (!existsSync('./uploads')) {
        mkdirSync('./uploads');
      }
      const time = new Date().getTime();
      filename = `${time}_${file.originalname}`;
      path = `./uploads/${filename}`;
    } else {
      if (!existsSync('./DefaultImages')) {
        mkdirSync('./DefaultImages');
      }
      if (existsSync(path)) {
        return `http://localhost:4000/file/${filename}`;
      }
    }
    const fileStream = createWriteStream(path);
    if (file) fileStream.write(file.buffer);
    fileStream.end();
    return `http://localhost:4000/file/${filename}`;
  }
}
