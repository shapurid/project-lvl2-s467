import { has } from 'lodash';
import formatter from './formatters';
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
    check: (key, before) => !has(before, key),
    process: (key, before, after) => ({ status: 'added', key, value: after[key] }),
  },
  {
    check: (key, before, after) => !has(after, key),
    process: (key, before) => ({ status: 'deleted', key, value: before[key] }),
  },
  {
    check: (key, before, after) => has(before, key) && has(after, key)
&& before[key] !== after[key],
    process: (key, before, after) => ({
      status: 'changed', key, valueOld: before[key], valueNew: after[key],
    }),
  },
];

const getPropertyActions = (...arg) => propertyActions.find(({ check }) => check(...arg));

const buildAst = (before, after) => Object.keys({ ...before, ...after }).map((el) => {
  const { process } = getPropertyActions(el, before, after);
  return process(el, before, after, buildAst);
});

export default (data1, data2, format) => {
  const dataObj1 = parseData(data1);
  const dataObj2 = parseData(data2);
  const ast = buildAst(dataObj1, dataObj2);
  return formatter[format](ast);
};
