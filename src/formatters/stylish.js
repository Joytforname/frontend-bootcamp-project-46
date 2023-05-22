import _ from "lodash"

const stringify = (objToString) => {
  if (!_.isObject(objToString)) {
  return `${objToString}`
 }
 console.log("try", objToString);
if (_.isObject(objToString)) {
  const keys = Object.keys(objToString);
  const stringObj = keys.map((key) => {
    return `${key}: ${stringify(objToString[key])}`
  })
  console.log(stringObj);
  return (`{\n${stringObj.join('\n')}\n}`);
}
}

const stylish = (statusobj) => {
  const status = statusobj.map((obj) => {
    const statuses = {
      default: ' ',
      deleted: '-',
      added: '+',
    };
    if (obj.status === 'File1') return `  ${statuses.deleted} ${obj.key}: ${stringify(obj.value)}`;
    if (obj.status === 'same') return `  ${statuses.default} ${obj.key}: ${stringify(obj.value)}`;
    if (obj.status === 'File2') return `  ${statuses.added} ${obj.key}: ${stringify(obj.value)}`;
    if (obj.status === 'samekey') {
      const newString = `  ${statuses.deleted} ${obj.key}: ${stringify(obj.value1)}\n  ${statuses.added} ${obj.key}: ${stringify(obj.value2)}`;
      return newString;
    }
    if (obj.status === 'deep') return `${obj.key}: ${stylish(obj.children)}`;
    return 'error';
  });
  return (`{\n${status.join('\n')}\n}`);
};




export default stylish;
