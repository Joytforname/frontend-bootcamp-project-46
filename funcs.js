import _ from 'lodash';

const makeStatus = (file1, file2) => {
  const keysfile1 = Object.keys(_.cloneDeep(file1));
  const keysfile2 = Object.keys(_.cloneDeep(file2));
  const keys = _.sortBy(_.uniqWith(keysfile1.concat(keysfile2), _.isEqual));
  const finish = keys.map((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) return ({ key, children: makeStatus(file1[key], file2[key]), status: 'deep' });
    if (file1[key] === file2[key]) return ({ key, value: file1[key], status: 'same' });
    if (_.has(file1, key) && _.has(file2, key) && file2[key] !== file1[key]) {
      return ({
        key, value1: file1[key], value2: file2[key], status: 'samekey',
      });
    }
    if (_.has(file1, key) && !_.has(file2, key)) return ({ key, value: file1[key], status: 'File1' });
    if (_.has(file2, key) && !_.has(file1, key)) return ({ key, value: file2[key], status: 'File2' });
    return Error;
  });
  return finish;
};

export default makeStatus;
