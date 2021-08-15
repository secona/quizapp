import { JwtPayload } from 'jsonwebtoken';
import { AccessToken } from '~/utils/tokens';

declare global {
  namespace Express {
    interface Request {
      accessToken: JwtPayload & AccessToken;
    }
  }
}
