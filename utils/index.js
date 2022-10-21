import crypto from 'crypto';

export const jsonFetcher = (url) => fetch(url).then((res) => res.json());

export const hashPassword = (password, passwordSalt) => {
  return crypto.pbkdf2Sync(password, passwordSalt, 1000, 64, 'sha512').toString('hex');
};
