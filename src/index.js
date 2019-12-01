import _ from 'lodash';
import formatter from './formatters';
import parseContent from './parsers';

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
  const contentOfFile1 = parseContent(filePath1);
  const contentOfFile2 = parseContent(filePath2);
  const ast = buildAst(contentOfFile1, contentOfFile2);
  return formatter[format](ast);
};
