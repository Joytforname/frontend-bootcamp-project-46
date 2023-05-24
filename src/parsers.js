import path from 'node:path';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';

export const format = (file) => path.extname(file);

export const formatParse = (fileForParse) => {
  if (format(fileForParse) === '.json') return JSON.parse(readFileSync(fileForParse), 'utf-8');
  if (format(fileForParse) === '.yml' || format(fileForParse) === '.yaml') return yaml.load(readFileSync(fileForParse), 'utf8');
  return Error;
};
