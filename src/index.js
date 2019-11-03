import _ from 'lodash';
import parseData from './parsers';

const propertyActions = [
  {
    check: (key, before, after) => before[key] === after[key],
    process: (key, before) => ({ status: 'notChanged', key, value: before[key] }),
  },
  {
    check: (key, before, after) => before[key] instanceof Object && after[key] instanceof Object,
    process: (key, before, after, fn) => ({ status: 'notChanged', key, children: fn(before[key], after[key]) }),
  },
  {
    check: (key, before, after) => !_.has(after, key),
    process: (key, before) => ({ status: 'deleted', key, value: before[key] }),
  },
  {
    check: (key, before) => !_.has(before, key),
    process: (key, before, after) => ({ status: 'added', key, value: after[key] }),
  },
  {
    check: (key, before, after) => !_.has(after, key),
    process: (key, before) => ({ status: 'deleted', key, value: before[key] }),
  },
  {
    check: (key, before, after) => _.has(before, key) && _.has(after, key)
&& before[key] !== after[key],
    process: (key, before, after) => ({
      status: 'changed', key, valueOld: before[key], valueNew: after[key],
    }),
  },
];

const getPropertyActions = (...arg) => _.find(propertyActions, ({ check }) => check(...arg));

const buildAst = (before, after) => Object.keys({ ...before, ...after }).map((el) => {
  const { process } = getPropertyActions(el, before, after);
  return process(el, before, after, buildAst);
});

const indent = (n) => ' '.repeat(n * 2);

const stringify = (obj, depth) => {
  if (obj instanceof Object) {
    const objToString = Object.keys(obj).reduce((acc, key) => [...acc, `  ${key}: ${obj[key]}`], []).join('\n');
    return `{\n${indent(depth + 2)}${objToString}\n${indent(depth)}  }`;
  }
  return obj;
};

const nodeHandlers = {
  added: ({ key, value }, depth) => `${indent(depth)}+ ${key}: ${stringify(value, depth)}`,
  deleted: ({ key, value }, depth) => `${indent(depth)}- ${key}: ${stringify(value, depth)}`,
  changed: ({ key, valueOld, valueNew }, depth) => [`${indent(depth)}- ${key}: ${stringify(valueOld, depth)}`, `${indent(depth)}+ ${key}: ${stringify(valueNew, depth)}`],
  notChanged: ({ key, value, children }, depth, f) => (children ? `${indent(depth)}  ${key}: {\n${f(children, depth + 2)}\n${indent(depth + 1)}}` : `${indent(depth)}  ${key}: ${stringify(value, depth)}`),
};

const constructDiff = (ast, depth = 1) => {
  const astToArr = ast.reduce(
    (acc, node) => [...acc, nodeHandlers[node.status](node, depth, constructDiff)], [],
  );
  return _.flatten(astToArr).join('\n');
};

const render = (ast) => `{\n${constructDiff(ast)}\n}\n`;


const genDiff = (data1, data2) => {
  const dataObj1 = parseData(data1);
  const dataObj2 = parseData(data2);
  const ast = buildAst(dataObj1, dataObj2);
  return render(ast);
};
export default genDiff;
