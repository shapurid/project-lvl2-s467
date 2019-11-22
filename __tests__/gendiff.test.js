import fs from 'fs';
import genDiff from '../src';

const formats = ['json', 'yml', 'ini'];
const getFixturePath = (dirPath, name = 'result.txt') => `./__tests__/__fixtures__/${dirPath}/${name}`;

describe('diff test', () => {
  describe('flat files test', () => {
    const typeOfTest = 'flatDiff';
    const expected = fs.readFileSync(getFixturePath(typeOfTest), 'utf8').trim();
    test.each(formats)('%s', (format) => {
      const beforePath = getFixturePath(typeOfTest, `before.${format}`);
      const afterPath = getFixturePath(typeOfTest, `after.${format}`);
      const actual = genDiff(beforePath, afterPath, 'diff');
      expect(actual).toBe(expected);
    });
  });
  describe('complex files test', () => {
    const typeOfTest = 'complexDiff';
    const expected = fs.readFileSync(getFixturePath(typeOfTest), 'utf8').trim();
    test.each(formats)('%s', (format) => {
      const beforePath = getFixturePath(typeOfTest, `before.${format}`);
      const afterPath = getFixturePath(typeOfTest, `after.${format}`);
      const actual = genDiff(beforePath, afterPath, 'diff');
      expect(actual).toBe(expected);
    });
  });
});

describe('plain and json test', () => {
  describe('plain test', () => {
    const typeOfTest = 'plain';
    const expected = fs.readFileSync(getFixturePath(typeOfTest), 'utf8').trim();
    test.each(formats)('%s', (format) => {
      const beforePath = getFixturePath(typeOfTest, `before.${format}`);
      const afterPath = getFixturePath(typeOfTest, `after.${format}`);
      const actual = genDiff(beforePath, afterPath, 'plain');
      expect(actual).toBe(expected);
    });
  });
  describe('json output test', () => {
    const expected = fs.readFileSync('./__tests__/__fixtures__/json/result.txt', 'utf8').trim();
    test('.ini - .yml test', () => {
      const received = genDiff('./__tests__/__fixtures__/plain/before.ini', './__tests__/__fixtures__/plain/after.yml', 'json');
      expect(received).toBe(expected);
    });
  });
});
