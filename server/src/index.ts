require('dotenv').config();
import { resolve, join } from 'path';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import errorHandler from '~/middlewares/errorHandler';
import api from '~/api/api.router';

const CLIENT_DIST = resolve(__dirname, '../../client/dist');

async function main() {
  const app = express();
  await mongoose.connect(process.env.MONGODB_URI!, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api', api);

  app.use(express.static(CLIENT_DIST));
  app.get('/*', (req, res) => {
    res.sendFile(join(CLIENT_DIST, 'index.html'));
  });

  app.use(errorHandler);
  app.listen(5000, () => {
    console.log('Listening on port 5000');
  });
}

main();
