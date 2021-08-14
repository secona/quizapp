import { RequestHandler } from 'express';
import { errors } from './quizzes.templates';
import prisma from '~/lib/prisma';
import authenticate from '~/middlewares/authenticate';

/** check quiz ownership. `authenticate` middleware included */
export const checkOwnership: RequestHandler[] = [
  authenticate,
  async (req, res, next) => {
    const { userId: authorId } = req.accessToken;
    const { quizId } = req.params;

    prisma.quiz
      .count({ where: { authorId, quizId } })
      .then(count => {
        if (count === 0) next(errors.notOwnedByUser(authorId, quizId));
        else next();
      })
      .catch(next);
  },
];
