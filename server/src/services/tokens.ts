import jwt from 'jsonwebtoken';

export interface AccessToken {
  userId: string;
}

export const signAccessToken = (payload: AccessToken) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '30d',
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as jwt.JwtPayload & AccessToken | null;
};

export default {
  signAccessToken,
  verifyAccessToken,
};
