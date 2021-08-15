import { selectFromUser } from '../users/users.templates';
import toBoolean from '~/utils/toBoolean';

export function getIncludes(query: Record<string, any>) {
  return {
    questions: toBoolean(query.include_questions ?? true),
    author: toBoolean(query.include_author) && { select: selectFromUser },
  };
}

export default {
  getIncludes,
};
