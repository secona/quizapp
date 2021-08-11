import { Router } from 'express';
import { auth, oauth2 } from '@googleapis/oauth2';

const router = Router();
const oauth = oauth2('v2');
const oauthClient = new auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.ROOT_URL + '/api/auth/google/callback',
})

router.get('/', (_, res) => {
  const url = oauthClient.generateAuthUrl({
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  });

  res.redirect(url);
});

router.get('/callback', async (req, res) => {
  try {
    const code = req.query.code as string;
    const { tokens } = await oauthClient.getToken(code);
    const { data } = await oauth.userinfo.v2.me.get({
      oauth_token: tokens.access_token!,
    });
  
    // create user and redirect to dashboard
    res.json({ data });
  } catch (e) {
    res.redirect('/login?error=true');
  }
});

export default router;
