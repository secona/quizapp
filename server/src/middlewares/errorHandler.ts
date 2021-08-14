import { Request, Response } from 'express';
import HTTPError from '~/templates/HTTPError';

export default function (
  err: HTTPError | Error | any,
  req: Request,
  res: Response,
  next: any
) {
  const error = err instanceof HTTPError ? err : new HTTPError({ ...err });
  res.status(error.statusCode).json({ error });
}
