import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import { config } from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'path';
import routes from './routes';

import errorHandler from './validations/handler/handler';

dotenvExpand(config());

const app = express();

// const allowedOrigins = process.env.SITESALLOWED!.split(',');
app.use(cors(
  // {
  //   origin: function (origin, callback) {
  //     if(!origin) return callback(new Error('Not allowed by CORS'))
  //     if (allowedOrigins.indexOf(origin) !== -1) {
  //       callback(null, true)
  //     } else {
  //       callback(new Error('Not allowed by CORS'))
  //     }
  //   }
  // }
));

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use('/erp/api/v1', routes);

app.use('/uploads/images', express.static(path.join(__dirname, '..', 'uploads', 'images')));
app.use('/uploads/pdfs', express.static(path.join(__dirname, '..', 'uploads', 'pdfs')));

app.use(errorHandler);

app.listen(process.env.HTTP_PORT || 3003);
