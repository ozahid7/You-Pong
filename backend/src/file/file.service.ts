import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';

@Injectable()
export class FileService {
  async getFile(filename: string, res: Response) {
    let pathname = `./uploads/${filename}`;
    if (filename === 'null') filename = 'groups.png';

    if (filename == 'groups.png') {
      pathname = `./DefaultImages/groups.png`;
    }
    if (filename == 'avatar.jpeg') {
      pathname = `./DefaultImages/avatar.jpeg`;
    }
    if (filename == 'Badge.ong') {
      pathname = `./DefaultImages/Badge.png`;
    }
    res.setHeader('Content-Disposition', `attachement; filename=${pathname}`);
    res.setHeader('Content-Type', 'Application/octet-stream');
    if (!existsSync(pathname)) {
      const message = `no such file or directory, open ${pathname}`;
      res.status(555).json({ message });
      return res;
    }
    const file = createReadStream(pathname);
    file.pipe(res);
  }
}
