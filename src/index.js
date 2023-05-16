//import _ from "lodash";
import { readFileSync } from 'node:fs';


//футкция для сравнения объектов
export function isEqual(object1, object2) {
  const props1 = Object.getOwnPropertyNames(object1);
  const props2 = Object.getOwnPropertyNames(object2);

  if (props1.length !== props2.length) {
    return false;
  }

  for (let i = 0; i < props1.length; i += 1) {
    const prop = props1[i];
    const bothAreObjects = typeof(object1[prop]) === 'object' && typeof(object2[prop]) === 'object';

    if ((!bothAreObjects && (object1[prop] !== object2[prop]))
    || (bothAreObjects && !isEqual(object1[prop], object2[prop]))) {
      return false;
    }
  }

  return true;
};
//создаёт массив со статусами объектов
export const makeStatus = (file1, file2) => {
  const keysfile1 = Object.keys(_.cloneDeep(file1));
  const keysfile2 = Object.keys(_.cloneDeep(file2));
  const keys = _.uniqWith(keysfile1.concat(keysfile2), _.isEqual).sort();
  const finish =[];
  const keysStatus = keys.map((key) => {
    if (file1[key] === file2[key]) finish.push({key: key, value: file1[key], status: 'same'});
    if(_.has(file1, key) && _.has(file2, key) && file2[key] !== file1[key] ) finish.push({key: key, value1: file1[key], value2: file2[key], status: 'samekey'});
    if(_.has(file1, key) && !_.has(file2, key)) finish.push({key: key, value: file1[key], status: 'File1_Only'});
    if(_.has(file2, key) && !_.has(file1, key)) finish.push({key: key, value: file2[key], status: 'File2_Only'});
  });
  return finish;
};

//финальный конструктор
export const notAsame = (fileN1, fileN2) => {
  if (isEqual(fileN1, fileN2)) return JSON.stringify(fileN1);
  const result = {}; 
  const status = makeStatus(fileN1, fileN2).map((obj) => {
    if (obj.status === 'File1_Only') result['- ' + obj.key] = obj.value;
    if (obj.status === 'same') result[obj.key] = obj.value;
    if (obj.status === 'File2_Only') result['+ ' + obj.key] = obj.value;
    if (obj.status === 'samekey') {
      result['- ' + obj.key] = obj.value1;
      result['+ ' + obj.key] = obj.value2;
    }
  });
  return JSON.stringify(result);
}

console.log(notAsame(filee1, filee2));