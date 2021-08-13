import { customAlphabet } from 'nanoid';

const alphabets = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
export const nanoid = customAlphabet(alphabets, 20);
