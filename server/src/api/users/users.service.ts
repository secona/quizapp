import { User } from '@prisma/client';
import Joi from 'joi';

export const validateUser = (user: Partial<User>) => {
  const schema = Joi.object<User>({
    name: Joi.string(),
    username: Joi.string().regex(/^[_\.a-zA-Z0-9]+$/).min(3).max(20),
  });

  return schema.validate(user, {
    abortEarly: false,
    stripUnknown: true,
  });
};

export default {
  validateUser,
};
