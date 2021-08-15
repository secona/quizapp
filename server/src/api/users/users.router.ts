import { Router } from 'express';
import { selectFromUser } from './users.templates';
import { userSchema } from './users.schemas';
import errors from '~/templates/errors';
import authenticate from '~/middlewares/authenticate';
import prisma from '~/lib/prisma';

const router = Router();

router.get('/:userId', authenticate, (req, res, next) => {
  const userId =
    req.params.userId === 'me' ? req.accessToken.userId : req.params.userId;

  prisma.user
    .findUnique({ where: { userId }, select: selectFromUser })
    .then(data => res.status(200).json({ data }))
    .catch(next);
});

router.patch('/me', authenticate, (req, res, next) => {
  const { userId } = req.accessToken;
  const result = userSchema.validate(req.body);
  if (result.error) return next(errors.joiError(result.error));

  prisma.user
    .update({ where: { userId }, data: result.value })
    .then(data => res.status(200).json({ data }))
    .catch(next);
});

router.delete('/me', authenticate, (req, res, next) => {
  const { userId } = req.accessToken;

  // todo: user recovery
  prisma.user
    .delete({ where: { userId } })
    .then(() => res.status(204).end())
    .catch(next);
});

export default router;
