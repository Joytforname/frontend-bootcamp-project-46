import path from 'node:path';
import yaml from 'js-yaml';

export const format = (file) => path.extname(file).slice(1);

export const parse = (fileForParse, formate) => {
  if (formate === 'json') return JSON.parse(fileForParse, 'utf-8');
  if (formate === 'yml' || formate === 'yaml') return yaml.load(fileForParse, 'utf8');
  return Error;
};
