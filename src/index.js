import _ from "lodash";
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
 keys.forEach((key) => {
    if (file1[key] === file2[key]) finish.push({key: key, value: file1[key], status: 'same'});
    if(_.has(file1, key) && _.has(file2, key) && file2[key] !== file1[key] ) finish.push({key: key, value1: file1[key], value2: file2[key], status: 'samekey'});
    if(_.has(file1, key) && !_.has(file2, key)) finish.push({key: key, value: file1[key], status: 'File1'});
    if(_.has(file2, key) && !_.has(file1, key)) finish.push({key: key, value: file2[key], status: 'File2'});
  });
  console.log(finish);
  return finish;
};

//финальный конструктор
export const notAsame = (path1, path2) => {
  const toFile1 = readFileSync(path1, 'utf-8');
  const toFile2 = readFileSync(path2, 'utf-8');
  const objFile1 = JSON.parse(toFile1);
  const objFile2 = JSON.parse(toFile2);
  if (isEqual(objFile1, objFile2)) return JSON.stringify(objFile1);
  const status = makeStatus(objFile1, objFile2).map((obj) => {
    if (obj.status === 'File1') return `${['- ' + obj.key]}: ${obj.value}`;
    if (obj.status === 'same') return `${['  ' + obj.key]}: ${obj.value}`;
    if (obj.status === 'File2') return `${['+ ' + obj.key]}: ${obj.value}`;
    if (obj.status === 'samekey') {
      const newString = `${['- ' + obj.key]}: ${obj.value1}\n${['+ ' + obj.key]}: ${obj.value2}`; 
      return newString;
    }
  });
  console.log(`{\n${status.join('\n')}\n}`);
}

