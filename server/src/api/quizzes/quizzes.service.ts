import { Question, Quiz } from '@prisma/client';
import Joi from 'joi';
import { select } from '../users/users.templates';
import toBoolean from '~/utils/toBoolean';

export function validateBody(body: any, options?: Joi.ValidationOptions) {
  const schema = Joi.object<Quiz & { questions: any }>({
    title: Joi.string(),
    description: Joi.string().default(''),
    questions: Joi.array().items(
      Joi.object<Question>({
        choices: Joi.array().items(Joi.string()).required(),
        correct: Joi.number().max(Joi.ref('choices.length')).required(),
        question: Joi.string().required(),
      })
    ),
  });

  return schema.validate(body, {
    abortEarly: false,
    stripUnknown: true,
    ...options,
  });
}

export function getIncludes(query: Record<string, any>) {
  return {
    questions: toBoolean(query.include_question ?? true),
    author: toBoolean(query.include_author) && { select },
  };
}

export default {
  validateBody,
};
