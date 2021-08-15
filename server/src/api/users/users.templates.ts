import { User } from '@prisma/client';

export const selectFromUser: Partial<Record<keyof User, boolean>> = {
  userId: true,
  username: true,
  name: true,
  picture: true,
  createdAt: true,
};