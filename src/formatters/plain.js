import _ from 'lodash';

const complex = (file) => {
  if (_.isObject(file)) return '[complex value]';
  return (typeof file === 'string') ? `'${file}'` : file;
};

const plain = (objstatuses) => {
  const iter = (node, path) => {
    const strings = [];
    node.forEach((obj) => {
      const currentPath = (path.length === 0) ? `${obj.key}` : `${path}.${obj.key}`;
      if (obj.status === 'File1') {
        strings.push(`Property '${currentPath}' was removed`);
      } else if (obj.status === 'File2') {
        strings.push(`Property '${currentPath}' was added with value: ${complex(obj.value)}`);
      } else if (obj.status === 'deep') {
        strings.push(`${iter(obj.children, currentPath)}`);
      } else if (obj.status === 'samekey') {
        strings.push(`Property '${currentPath}' was updated. From ${complex(obj.value1)} to ${complex(obj.value2)}`);
      }
    });
    const final = `${strings.join('\n')}`;
    return final;
  };
  return iter(objstatuses, '');
};

export default plain;
