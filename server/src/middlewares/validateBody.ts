import { RequestHandler } from 'express';
import { Schema, ValidationOptions } from "joi";
import errors from '~/templates/errors';

export default (schema: Schema, options?: ValidationOptions) =>
  <RequestHandler>((req, res, next) => {
    const result = schema.validate(req.body, options);
    if (result.error) return next(errors.joiError(result.error));
    req.validationResult = result;
    next();
  });
