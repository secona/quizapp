import { ValidationErrorItem } from 'joi';

export default class HTTPError {
  statusCode: number = 500;
  message: string = 'an error occurred';
  details: ValidationErrorItem[] = [];

  constructor(e?: Partial<HTTPError>) {
    Object.assign(this, e);
  }
}
