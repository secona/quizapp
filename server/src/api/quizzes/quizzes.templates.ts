import HTTPError from '~/templates/HTTPError';
import toBoolean from '~/utils/toBoolean';
import { selectFromUser } from '../users/users.templates';

export const errors = {
  notOwnedByUser: (userId: string, quizId: string) => new HTTPError({
    statusCode: 403,
    message: "you don't have access to edit this quiz",
    details: [{
      message: `user with id "${userId}" doesn't have acces to quiz with id "${quizId}"`,
      context: { key: 'quizId', value: quizId },
    }]
  }),
};

export const getQuizIncludes = (query: Record<string, any>) => ({
  questions: toBoolean(query.include_questions ?? true),
  author: toBoolean(query.include_author) && { select: selectFromUser() },
});
