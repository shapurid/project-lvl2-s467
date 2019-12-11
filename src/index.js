import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import render from './formatters';
import parse from './parsers';

const propertyActions = [
  {
    check: (key, before, after) => before[key] === after[key],
    process: (key, before) => ({ status: 'unchanged', key, value: before[key] }),
  },
  {
    check: (key, before, after) => before[key] instanceof Object && after[key] instanceof Object,
    process: (key, before, after, fn) => ({ status: 'nested', key, children: fn(before[key], after[key]) }),
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

const getPropertyActions = (...arg) => propertyActions.find(({ check }) => check(...arg));

const buildAst = (before, after) => {
  const keys = _.union(_.keys(before), _.keys(after));
  return keys.map((key) => {
    const { process } = getPropertyActions(key, before, after);
    return process(key, before, after, buildAst);
  });
};

const getData = (config) => {
  const filePath = path.resolve(config);
  const contentOfFile = fs.readFileSync(filePath, 'utf-8');
  const type = path.extname(filePath).slice(1);
  return parse(contentOfFile, type);
};

export default (config1, config2, format) => {
  const data1 = getData(config1);
  const data2 = getData(config2);
  const ast = buildAst(data1, data2);
  return render(ast, format);
};
