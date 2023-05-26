import _ from 'lodash';

const complex = (file) => {
  if (_.isObject(file)) return '[complex value]';
  return (typeof file === 'string') ? `'${file}'` : file;
};

const plain = (objstatuses) => {
  const iter = (node, path) => {
    const strings = node.map((obj) => {
      const currentPath = (path.length === 0) ? `${obj.key}` : `${path}.${obj.key}`;
      if (obj.status === 'deleted') return (`Property '${currentPath}' was removed`);
      if (obj.status === 'added') return (`Property '${currentPath}' was added with value: ${complex(obj.value)}`);
      if (obj.status === 'nested') return (`${iter(obj.children, currentPath)}`);
      if (obj.status === 'changed') return (`Property '${currentPath}' was updated. From ${complex(obj.value1)} to ${complex(obj.value2)}`);
      if (obj.status === 'unchanged') return null;
      throw new Error('Error');
    });
    const final = `${strings.filter((str) => str).join('\n')}`;
    return final;
  };
  return iter(objstatuses, '');
};

export default plain;
