import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File | null) {
    let path = `./DefaultImages/groups.svg`;
    let filename = `groups.svg`;
     if (file) {
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
    const fileStream = createWriteStream(path);
    if (existsSync(path)) {
      console.log('file already existe');
      return filename;
    }
      await fileStream.write(file.buffer);
    fileStream.end();
    return filename;
  }
}
