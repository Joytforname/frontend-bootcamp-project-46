import _ from "lodash"


const deep = 4;
const space = " ";


const stringify = (objToString, depth) => {
  if (!_.isObject(objToString)) {
  return `${objToString}`
 } 
 const objEntries = Object.entries(objToString)
 const result = objEntries.map(([key, value]) => `${space.repeat(deep * depth + deep)}${key}: ${stringify(value, depth +1)}`);
 const strings = `${result.join('\n')}`;
 return (`{\n${strings}\n${space.repeat(deep * depth)}}`);
  };
 

const stylish = (objstatuses) => {
  const iter = (node, depth) => {
    const strings = [];
  node.forEach((obj) => {
    const statuses = {
      default: ' ',
      deleted: '-',
      added: '+',
    };
    if (obj.status === 'File1') {
       strings.push(`${space.repeat(deep * depth + (deep / 2))}${statuses.deleted} ${obj.key}: ${stringify(obj.value, depth +1)}`);
    }
    else if (obj.status === 'File2') {
      strings.push(`${space.repeat(deep * depth + (deep / 2))}${statuses.added} ${obj.key}: ${stringify(obj.value, depth +1)}`);
    }
    else if (obj.status === 'same') {
      strings.push(`${space.repeat(deep * depth + (deep / 2))}${statuses.default} ${obj.key}: ${stringify(obj.value, depth +1)}`);
    }
    else if (obj.status === 'deep') {
      strings.push(`${space.repeat(deep + depth * deep)}${obj.key}: ${iter(obj.children, depth +1)}`);
    }
    else if (obj.status === 'samekey') {
      strings.push(`${space.repeat(deep * depth + (deep / 2))}${statuses.deleted} ${obj.key}: ${stringify(obj.value1, depth +1)}`);
      strings.push(`${space.repeat(deep * depth + (deep / 2))}${statuses.added} ${obj.key}: ${stringify(obj.value2, depth +1)}`);
    }
  });
  const final = `{\n${strings.join('\n')}\n${space.repeat(depth * deep)}}`;
  return final;
};
return iter(objstatuses, 0);
};

export default stylish;

