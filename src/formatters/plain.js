import { flatten } from 'lodash';

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
  notChanged: (keyWithPath, { children }, f) => (children ? `${f(children, keyWithPath)}` : []),
};

const constructPlain = (ast, path) => {
  const astToArr = ast.reduce(
    (acc, node) => [...acc, nodeHandlers[node.status](path ? `${path}.${node.key}` : node.key, node, constructPlain)], [],
  );
  return flatten(astToArr).join('\n');
};

export default (ast) => `${constructPlain(ast)}`;
