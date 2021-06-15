import multer, {FileFilterCallback} from 'multer';
import path from 'path';
import { Request } from 'express';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads', 'pdfs'),
    filename: (request, file, cb) => {

      const name = file.originalname.toLowerCase().split(' ').join('-');
      const fileName = `${Date.now()}-${name}`;

      cb(null, fileName);
    }
  }),
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: function(rep: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    const allowedMimes = [
      'application/pdf'
    ]

    if(allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {

      cb(null, false);
      
      return cb(
        new Error('Invalid document type. The document type valid is pdf.')
      );
    }
  }
}