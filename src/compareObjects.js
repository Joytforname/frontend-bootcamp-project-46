import _ from 'lodash';

const compareObjects = (obj1, obj2) => {
  const keysobj1 = Object.keys(_.cloneDeep(obj1));
  const keysobj2 = Object.keys(_.cloneDeep(obj2));
  const keys = _.sortBy(_.uniqWith(keysobj1.concat(keysobj2), _.isEqual));
  const finish = keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) return ({ key, children: compareObjects(obj1[key], obj2[key]), status: 'nested' });

    if (obj1[key] === obj2[key]) return ({ key, value: obj1[key], status: 'unchanged' });

    if (_.has(obj1, key) && _.has(obj2, key) && obj2[key] !== obj1[key]) {
      return ({
        key, value1: obj1[key], value2: obj2[key], status: 'changed',
      });
    }

    if (_.has(obj1, key)) return ({ key, value: obj1[key], status: 'deleted' });

    if (_.has(obj2, key)) return ({ key, value: obj2[key], status: 'added' });
    return Error;
  });
  return finish;
};

export default compareObjects;
