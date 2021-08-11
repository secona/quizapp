import { Router } from 'express';

const router = Router();

router.use('/google', require('./google/google.router').default);

export default router;
