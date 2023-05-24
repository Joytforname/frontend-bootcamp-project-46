import { formatParse } from './parsers.js';
import stylish from './formatters/stylish.js';
import makeStatus from '../funcs.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

const final = (path1, path2, formatName = 'stylish') => {
  const objFile1 = formatParse(path1);
  const objFile2 = formatParse(path2);
  const statuses = makeStatus(objFile1, objFile2);
  if (formatName === 'stylish') {
    return stylish(statuses);
  }
  if (formatName === 'plain') {
    return plain(statuses);
  }
  if (formatName === 'plain') {
    return plain(statuses);
  }
  if (formatName === 'json') {
    return json(statuses);
  }
};

export default final;
