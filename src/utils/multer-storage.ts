import {diskStorage} from "multer";
import * as mime from "mime";
import {v4 as uuid} from "uuid";
import {MulterOptions} from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export function multerStorage(dest: string): MulterOptions['storage'] {
  return diskStorage({
    destination: dest,
    filename: (req, file, cb) => cb(null, `${uuid()}.${mime.getExtension(file.mimetype)}`),
  });
}