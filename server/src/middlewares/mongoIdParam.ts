import { RequestHandler } from 'express';
import { isValidObjectId } from 'mongoose';
import HTTPError from '~/templates/HTTPError';

const invalidMongoId = (value: any, key: any) =>
  new HTTPError({
    statusCode: 422,
    message: 'invalid id',
    details: [
      {
        message: 'invalid objectid',
        type: 'objectId.base',
        context: { value, key },
      },
    ],
  });

export default (...params: string[]) => <RequestHandler>((req, res, next) => {
    for (let i = 0; i < params.length; i++) {
      const key = params[i];
      const value = req.params[key];
      if (value === 'me') continue;

      const result = isValidObjectId(value);
      if (!result) return next(invalidMongoId(value, key));
    }
    next();
  });
