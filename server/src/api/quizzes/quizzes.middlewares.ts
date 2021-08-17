import { RequestHandler } from 'express';
import authenticate from '~/middlewares/authenticate';
import HTTPError from '~/templates/HTTPError';
import { Quiz } from './quizzes.model';

/** check quiz ownership. `authenticate` middleware included */
export const checkOwnership: RequestHandler[] = [
  authenticate,
  async (req, res, next) => {
    const { userId } = req.accessToken;
    const { quizId } = req.params;

    Quiz.count({ _id: quizId, author: userId })
      .then(count => {
        if (count === 0)
          next(
            new HTTPError({
              statusCode: 403,
              message: "you don't have access to edit this quiz",
              details: [
                {
                  message: `user with id "${userId}" doesn't have acces to quiz with id "${quizId}"`,
                  context: { key: 'quizId', value: quizId },
                },
              ],
            })
          );
        next();
      })
      .catch(next);
  },
];
