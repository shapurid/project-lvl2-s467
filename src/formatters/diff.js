import _ from 'lodash';

const indent = (n) => ' '.repeat(n * 2);

const stringify = (obj, depth) => {
  if (!(obj instanceof Object)) {
    return obj;
  }
  const keys = _.keys(obj);
  const objToString = keys.reduce((acc, key) => [...acc, `  ${key}: ${obj[key]}`], []).join('\n');
  return `{\n${indent(depth + 2)}${objToString}\n${indent(depth)}  }`;
};

const nodeHandlers = {
  added: (depth, { key, value }) => `${indent(depth)}+ ${key}: ${stringify(value, depth)}`,
  changed: (depth, { key, valueOld, valueNew }) => [`${indent(depth)}- ${key}: ${stringify(valueOld, depth)}`, `${indent(depth)}+ ${key}: ${stringify(valueNew, depth)}`],
  deleted: (depth, { key, value }) => `${indent(depth)}- ${key}: ${stringify(value, depth)}`,
  notChanged: (depth, { key, value, children }, f) => {
    if (_.isUndefined(children)) {
      return `${indent(depth)}  ${key}: ${stringify(value, depth)}`;
    }
    return `${indent(depth)}  ${key}: {\n${f(children, depth + 2)}\n${indent(depth + 1)}}`;
  },
};

const constructDiff = (ast, depth = 1) => {
  const astToArr = ast.map((node) => {
    const choosenHandler = nodeHandlers[node.status];
    return choosenHandler(depth, node, constructDiff);
  });
  return _.flatten(astToArr).join('\n');
};

export default (ast) => `{\n${constructDiff(ast)}\n}`;
