import { Router } from 'express';

const router = Router();

router.use('/auth', require('./auth/auth.router').default);
router.use('/users', require('./users/users.router').default);

export default router;
