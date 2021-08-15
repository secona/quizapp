import { Router } from 'express';
import { selectFromUser, getUserIncludes } from './users.templates';
import { userSchema } from './users.schemas';
import errors from '~/templates/errors';
import authenticate from '~/middlewares/authenticate';
import prisma from '~/lib/prisma';

const router = Router();

// get user by userId or get my info
router.get('/:userId', authenticate, (req, res, next) => {
  const isMe = req.params.userId === 'me';
  const userId = isMe ? req.accessToken.userId : req.params.userId;

  prisma.user
    .findUnique({
      where: { userId },
      select: {
        ...selectFromUser(isMe),
        ...getUserIncludes(req.query),
      },
    })
    .then(data => res.status(200).json({ data }))
    .catch(next);
});

// update `me` user
router.patch('/me', authenticate, (req, res, next) => {
  const { userId } = req.accessToken;
  const result = userSchema.validate(req.body);
  if (result.error) return next(errors.joiError(result.error));

  prisma.user
    .update({
      where: { userId },
      data: result.value,
      include: getUserIncludes(req.query),
    })
    .then(data => res.status(200).json({ data }))
    .catch(next);
});

// delete `me` user
router.delete('/me', authenticate, (req, res, next) => {
  const { userId } = req.accessToken;

  // todo: user recovery
  prisma.user
    .delete({ where: { userId } })
    .then(() => res.status(204).end())
    .catch(next);
});

export default router;
