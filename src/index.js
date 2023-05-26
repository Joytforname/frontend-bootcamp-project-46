import { readFileSync } from 'fs';
import { format, parse } from './parsers.js';
import stylish from './formatters/stylish.js';
import compareObjects from './compareObjects.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

const final = (path1, path2, formatName = 'stylish') => {
  const readFile1 = readFileSync(path1);
  const readFile2 = readFileSync(path2);
  const objFile1 = parse(readFile1, format(path1));
  const objFile2 = parse(readFile2, format(path2));
  const statuses = compareObjects(objFile1, objFile2);
  if (formatName === 'stylish') return stylish(statuses);
  if (formatName === 'plain') return plain(statuses);
  if (formatName === 'json') return json(statuses);
  return Error;
};

export default final;
