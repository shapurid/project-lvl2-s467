import fs from 'fs';
import genDiff from '../src';

describe('testing flat files', () => {
  const result = fs.readFileSync('./__tests__/__fixtures__/flatten/result.txt', 'utf8'); // не понимаю, почему fs.readDileSync() импортирует содержимое файла с отступом в конце, есть ли возможность его убрать?
  test('json test', () => {
    const received = genDiff('./__tests__/__fixtures__/flatten/before.json', './__tests__/__fixtures__/flatten/after.json');
    expect(received).toBe(result);
  });
  test('yml test', () => {
    const received = genDiff('./__tests__/__fixtures__/flatten/before.yml', './__tests__/__fixtures__/flatten/after.yml');
    expect(received).toBe(result);
  });
  test('ini test', () => {
    const received = genDiff('./__tests__/__fixtures__/flatten/before.ini', './__tests__/__fixtures__/flatten/after.ini');
    expect(received).toBe(result);
  });
});
describe('recusion testing', () => {
  const result = fs.readFileSync('./__tests__/__fixtures__/recursion/result.txt', 'utf8');
  test('json test', () => {
    const received = genDiff('./__tests__/__fixtures__/recursion/before.json', './__tests__/__fixtures__/recursion/after.json');
    expect(received).toBe(result);
  });
  test('yml test', () => {
    const received = genDiff('./__tests__/__fixtures__/recursion/before.yml', './__tests__/__fixtures__/recursion/after.yml');
    expect(received).toBe(result);
  });
  test('ini test', () => {
    const received = genDiff('./__tests__/__fixtures__/recursion/before.ini', './__tests__/__fixtures__/recursion/after.ini');
    expect(received).toBe(result);
  });
});
