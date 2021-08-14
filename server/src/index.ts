require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import errorHandler from '~/middlewares/errorHandler';
import api from '~/api/api.router';

function main() {
  const app = express();

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cookieParser())
  app.use('/api', api);
  app.use(errorHandler);
  
  app.listen(5000, () => {
    console.log('Listening on port 5000');
  });
}

main();
