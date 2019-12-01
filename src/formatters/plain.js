import _ from 'lodash';

const stringify = (obj) => {
  if (obj instanceof Object) {
    return '[complex value]';
  } if (typeof obj === 'string') {
    return Number.isNaN(Number(obj)) ? `'${obj}'` : obj;
  }
  return obj;
};

const nodeHandlers = {
  added: (keyWithPath, { value }) => `Property '${keyWithPath}' was added with value: ${stringify(value)}`,
  deleted: (keyWithPath) => `Property '${keyWithPath}' was removed`,
  changed: (keyWithPath, { valueOld, valueNew }) => `Property '${keyWithPath}' was updated. From ${stringify(valueOld)} to ${stringify(valueNew)}`,
  notChanged: (keyWithPath, { children }, f) => (_.isUndefined(children) ? [] : `${f(children, keyWithPath)}`),
};

const constructPlain = (ast, path) => {
  const astToArr = ast.map((node) => {
    const formedPathOfProperty = path ? `${path}.${node.key}` : node.key;
    const choosenHandler = nodeHandlers[node.status];
    return choosenHandler(formedPathOfProperty, node, constructPlain);
  });
  return _.flatten(astToArr).join('\n');
};

export default (ast) => `${constructPlain(ast)}`;
