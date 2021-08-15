import Joi from '~/lib/Joi';

export const quizSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
});