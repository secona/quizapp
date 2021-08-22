require('dotenv').config();
import { resolve, join } from 'path';
import express from 'express';
import csurf from 'csurf';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import errorHandler from '~/middlewares/errorHandler';
import api from '~/api/api.router';
import cookieConfig from '~/config/cookie';
import connectDB from '~/connectDB';

const CLIENT_DIST = resolve(__dirname, '../../client/dist');

async function main() {
  const app = express();
  await connectDB();

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cookieParser());
  app.use(csurf({ cookie: cookieConfig }));
  app.use('/api', api);

  app.use(express.static(CLIENT_DIST));
  app.get('*', (req, res) => {
    res.cookie('csrf_token', req.csrfToken(), cookieConfig);
    res.sendFile(join(CLIENT_DIST, 'index.html'));
  });

  app.use(errorHandler);
  app.listen(5000, () => {
    console.log('Listening on port 5000 for', process.env.NODE_ENV);
  });
}

main();
