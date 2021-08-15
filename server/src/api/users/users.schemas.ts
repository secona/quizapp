import { User } from '@prisma/client';
import Joi from '~/lib/Joi';

export const userSchema = Joi.object<User>({
  name: Joi.string(),
  username: Joi.string().regex(/^[_\.a-zA-Z0-9]+$/).min(3).max(20),
});
