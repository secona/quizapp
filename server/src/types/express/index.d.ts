import { JwtPayload } from 'jsonwebtoken';
import { AccessToken } from '~/services/tokens';

declare global {
  namespace Express {
    interface Request {
      accessToken: JwtPayload & AccessToken;
    }
  }
}
