const notAsame = (statusobj) => {
  const status = statusobj.map((obj) => {
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
export default notAsame;
