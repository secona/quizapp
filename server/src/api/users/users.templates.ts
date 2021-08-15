import { User } from '@prisma/client';
import toBoolean from '~/utils/toBoolean';

export const selectFromUser = (withRestricted: boolean = false) => ({
  userId: true,
  username: true,
  name: true,
  picture: true,
  createdAt: true,

  ...(withRestricted ? {
    email: true,
    updatedAt: true,
  } : {})
} as Partial<Record<keyof User, boolean>>);

export const getUserIncludes = (query?: Record<string, any>) => ({
  quizzes: toBoolean(query?.include_quizzes),
});
