import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File | null) {
    let avatar: string;
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
    avatar = `http://localhost:4000/file/${filename}`
    if (existsSync(path)) {
      return avatar;
    }
    const fileStream = createWriteStream(path);
    await fileStream.write(file.buffer);
    fileStream.end();
    return avatar;
  }
}
