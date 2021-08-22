import { ValidationResult } from 'joi';
import { JwtPayload } from 'jsonwebtoken';
import { AccessToken } from '~/lib/tokens';

declare global {
  namespace Express {
    interface Request {
      accessToken: JwtPayload & AccessToken;
      validationResult: ValidationResult;
    }
  }
}
