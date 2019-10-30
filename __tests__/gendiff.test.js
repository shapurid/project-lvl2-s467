import fs from 'fs';
import genDiff from '../src';

const result = fs.readFileSync('./__tests__/__fixtures__/result.txt', 'utf8'); // не понимаю, почему fs.readDileSync() импортирует содержимое файла с отступом, есть ли возможность его убрать?

test('json test', () => {
  const received = genDiff('./__tests__/__fixtures__/before.json', './__tests__/__fixtures__/after.json');
  expect(received).toBe(result);
});

test('yml test', () => {
  const received = genDiff('./__tests__/__fixtures__/before.yml', './__tests__/__fixtures__/after.yml');
  expect(received).toBe(result);
});
