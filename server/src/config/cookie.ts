import { CookieOptions } from 'express';

export default {
  secure: process.env.NODE_ENV === 'development' ? false : true,
} as CookieOptions;
