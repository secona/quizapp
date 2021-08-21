import toBoolean from '~/utils/toBoolean';

export const getPopulateOptions = (query: Record<string, any>) =>
  toBoolean(query.include_quizzes) && {
    path: 'quizzes',
    select: '-questions',
  };

export default {
  getPopulateOptions,
};
