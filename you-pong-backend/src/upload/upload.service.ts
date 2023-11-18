import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File | null) {
    let path = `./DefaultImages/groups.png`;
    let filename = `groups.png`;

    if (file !== undefined) {
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
    }
    if (existsSync(path)) {
      return filename;
    }
    const fileStream = createWriteStream(path);
    await fileStream.write(file.buffer);
    fileStream.end();
    return filename;
  }
}
