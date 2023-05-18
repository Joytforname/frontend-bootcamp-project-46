import _ from 'lodash';
import { readFileSync } from 'fs';
import { formatParse } from '../src/parsers.js';

// футкция для сравнения объектов
export function isEqual(object1, object2) {
  const props1 = Object.getOwnPropertyNames(object1);
  const props2 = Object.getOwnPropertyNames(object2);

  if (props1.length !== props2.length) {
    return false;
  }
  for (let i = 0; i < props1.length; i += 1) {
    const prop = props1[i];
    const bothAreObjects = typeof (object1[prop]) === 'object' && typeof (object2[prop]) === 'object';

    if ((!bothAreObjects && (object1[prop] !== object2[prop]))
    || (bothAreObjects && !isEqual(object1[prop], object2[prop]))) {
      return false;
    }
  }

  return true;
}
// создаёт массив со статусами объектов
export const makeStatus = (file1, file2) => {
  const keysfile1 = Object.keys(_.cloneDeep(file1));
  const keysfile2 = Object.keys(_.cloneDeep(file2));
  const keys = _.uniqWith(keysfile1.concat(keysfile2), _.isEqual).sort();
  const finish = [];
  keys.forEach((key) => {
    if (file1[key] === file2[key]) finish.push({ key, value: file1[key], status: 'same' });
    if (_.has(file1, key) && _.has(file2, key) && file2[key] !== file1[key]) {
      finish.push({
        key, value1: file1[key], value2: file2[key], status: 'samekey',
      });
    }
    if (_.has(file1, key) && !_.has(file2, key)) finish.push({ key, value: file1[key], status: 'File1' });
    if (_.has(file2, key) && !_.has(file1, key)) finish.push({ key, value: file2[key], status: 'File2' });
  });
  return finish;
};

// финальный конструктор
export const notAsame = (path1, path2) => {
  const objFile1 = formatParse(path1);
  const objFile2 = formatParse(path2);
  if (isEqual(objFile1, objFile2)) return JSON.stringify(objFile1);
  const status = makeStatus(objFile1, objFile2).map((obj) => {
    const statuses = {
      default: ' ',
      deleted: '-',
      added: '+',
    };
    if (obj.status === 'File1') return `  ${statuses.deleted} ${obj.key}: ${obj.value}`;
    if (obj.status === 'same') return `  ${statuses.default} ${obj.key}: ${obj.value}`;
    if (obj.status === 'File2') return `  ${statuses.added} ${obj.key}: ${obj.value}`;
    if (obj.status === 'samekey') {
      const newString = `  ${statuses.deleted} ${obj.key}: ${obj.value1}\n  ${statuses.added} ${obj.key}: ${obj.value2}`;
      return newString;
    }
    return 'error';
  });
  return (`{\n${status.join('\n')}\n}`);
};
