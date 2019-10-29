import fs from 'fs';
import { has } from 'lodash';

export default (data1, data2) => {
  const dataObj1 = JSON.parse(fs.readFileSync(data1, 'utf8'));
  const dataObj2 = JSON.parse(fs.readFileSync(data2, 'utf8'));
  const result = Object.keys({ ...dataObj1, ...dataObj2 }).reduce((acc, key) => {
    if (has(dataObj1, key) && has(dataObj2, key)) {
      return dataObj1[key] === dataObj2[key] ? [...acc, `    ${key}: ${dataObj2[key]}`] : [...acc, `  + ${key}: ${dataObj2[key]}`, `  - ${key}: ${dataObj1[key]}`];
    }
    if (!has(dataObj1, key) && has(dataObj2, key)) {
      return [...acc, `  + ${key}: ${dataObj2[key]}`];
    }

    return [...acc, `  - ${key}: ${dataObj1[key]}`];
  }, []);
  return ['{', ...result, '}\n'].join('\n');
};
