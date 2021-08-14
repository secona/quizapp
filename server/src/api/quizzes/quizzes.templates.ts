import HTTPError from '~/templates/HTTPError';

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
