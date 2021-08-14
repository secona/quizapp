import { Router } from 'express';

const router = Router();

router.use('/auth', require('./auth/auth.router').default);
router.use('/users', require('./users/users.router').default);
router.use('/quizzes', require('./quizzes/quizzes.router').default);

export default router;
