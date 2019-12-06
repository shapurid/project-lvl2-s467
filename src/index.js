import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import formatter from './formatters';
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

export default (filePath1, filePath2, format) => {
  const contentOfFile1 = fs.readFileSync(filePath1, 'utf-8');
  const contentOfFile2 = fs.readFileSync(filePath2, 'utf-8');
  const fileExtension1 = path.extname(filePath1);
  const fileExtension2 = path.extname(filePath2);
  const dataObj1 = parse(contentOfFile1, fileExtension1);
  const dataObj2 = parse(contentOfFile2, fileExtension2);
  const ast = buildAst(dataObj1, dataObj2);
  return formatter(ast, format);
};
