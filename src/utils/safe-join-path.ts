import { normalize, resolve } from 'path';

export const safeJoinPath = (base: string, target: string) => {
  const targetPath = '.' + normalize('/' + target);
  return resolve(base, targetPath);
};
