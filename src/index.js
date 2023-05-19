import { formatParse } from './parsers.js';
import notAsame from './formatters/stylish.js';
import makeStatus from '../funcs.js';

const final = (path1, path2) => {
  const objFile1 = formatParse(path1);
  const objFile2 = formatParse(path2);
  const statuses = makeStatus(objFile1, objFile2);
  return notAsame(statuses);
};

export default final;
