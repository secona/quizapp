import { Router } from 'express';

const router = Router();

router.use('/auth', require('./auth/auth.router').default);

export default router;
