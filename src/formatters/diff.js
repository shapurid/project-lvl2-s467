import { flatten } from 'lodash';

const indent = (n) => ' '.repeat(n * 2);

const stringify = (obj, depth) => {
  if (obj instanceof Object) {
    const objToString = Object.keys(obj).reduce((acc, key) => [...acc, `  ${key}: ${obj[key]}`], []).join('\n');
    return `{\n${indent(depth + 2)}${objToString}\n${indent(depth)}  }`;
  }
  return obj;
};

const nodeHandlers = {
  added: (depth, { key, value }) => `${indent(depth)}+ ${key}: ${stringify(value, depth)}`,
  changed: (depth, { key, valueOld, valueNew }) => [`${indent(depth)}- ${key}: ${stringify(valueOld, depth)}`, `${indent(depth)}+ ${key}: ${stringify(valueNew, depth)}`],
  deleted: (depth, { key, value }) => `${indent(depth)}- ${key}: ${stringify(value, depth)}`,
  notChanged: (depth, { key, value, children }, f) => (children ? `${indent(depth)}  ${key}: {\n${f(children, depth + 2)}\n${indent(depth + 1)}}` : `${indent(depth)}  ${key}: ${stringify(value, depth)}`),
};

const constructDiff = (ast, depth = 1) => {
  const astToArr = ast.reduce(
    (acc, node) => [...acc, nodeHandlers[node.status](depth, node, constructDiff)], [],
  );
  return flatten(astToArr).join('\n');
};

export default (ast) => `{\n${constructDiff(ast)}\n}`;
