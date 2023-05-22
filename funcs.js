import _ from 'lodash';

const makeStatus = (file1, file2) => {
  const keysfile1 = Object.keys(_.cloneDeep(file1));
  const keysfile2 = Object.keys(_.cloneDeep(file2));
  const keys = _.uniqWith(keysfile1.concat(keysfile2), _.isEqual).sort();
  const finish = [];
  keys.forEach((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) finish.push({ key, children: makeStatus(file1[key], file2[key]), status: 'deep' });
    else if (file1[key] === file2[key]) finish.push({ key, value: file1[key], status: 'same' });
    
    else if (_.has(file1, key) && _.has(file2, key) && file2[key] !== file1[key]) {
      finish.push({
        key, value1: file1[key], value2: file2[key], status: 'samekey',
      });
    }
    else if (_.has(file1, key) && !_.has(file2, key)) finish.push({ key, value: file1[key], status: 'File1' });
    else if (_.has(file2, key) && !_.has(file1, key)) finish.push({ key, value: file2[key], status: 'File2' });
  });
  return finish;
};






export default makeStatus;
