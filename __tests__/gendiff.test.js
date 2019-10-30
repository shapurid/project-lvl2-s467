import fs from 'fs';
import genDiff from '../src';

test('genDiff', () => {
  const received = genDiff('./__tests__/__fixtures__/before.json', './__tests__/__fixtures__/after.json');
  const result = fs.readFileSync('./__tests__/__fixtures__/result.txt', 'utf8'); // не понимаю, почему fs.readDileSync() импортирует содержимое файла с отступом, есть ли возможность его убрать?
  expect(received).toBe(result);
});
