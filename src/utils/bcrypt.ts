import * as bcrypt from 'bcrypt';

export const encodePassword = (password: string) => {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, SALT);
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
