import { RequestHandler } from 'express';
import { verifyAccessToken } from '~/services/tokens';
import errors from '~/templates/errors';

export default <RequestHandler>((req, res, next) => {
  const accessTokenCookie = req.cookies.access_token;
  if (!accessTokenCookie) return next(errors.notLoggedIn());
  
  try {
    const decoded = verifyAccessToken(accessTokenCookie);
    if (decoded) req.accessToken = decoded;
    next();
  } catch (e) {
    res.clearCookie('access_token');
    next(errors.tokenError(e.message));
  }
})