import { ValidationError } from 'joi';
import HTTPError from './HTTPError';

export default {
  notLoggedIn: () => new HTTPError({
    statusCode: 403,
    message: 'you are not logged in',
    details: [{
      message: 'access_token absent in cookies',
      path: ['access_token'],
      type: 'string.required',
      context: { key: 'access_token' },
    }],
  }),

  tokenError: (message: string) => new HTTPError({
    statusCode: 403,
    message: 'access_token error',
    details: [{
      message,
      path: ['access_token'],
      type: 'string.valid',
      context: { key: 'access_token' },
    }],
  }),

  joiError: (err: ValidationError) => new HTTPError({
    statusCode: 422,
    message: 'validation error',
    details: err.details,
  })
};
