import { formatParse } from './parsers.js';
import stylish from './formatters/stylish.js';
import makeStatus from '../funcs.js';
import plain from './formatters/plain.js';

const final = (path1, path2, formatter = 'stylish') => {
  const objFile1 = formatParse(path1);
  const objFile2 = formatParse(path2);
  const statuses = makeStatus(objFile1, objFile2);
  if (formatter === 'stylish') {
    return stylish(statuses);
  }
  if (formatter === 'plain') {
    return plain(statuses);
  }
};

export default final;
