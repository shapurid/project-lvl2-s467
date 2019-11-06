import fs from 'fs';
import genDiff from '../src';

describe('diff test', () => {
  describe('flat files test', () => {
    const expected = fs.readFileSync('./__tests__/__fixtures__/diff/flat/result.txt', 'utf8');
    test('.json', () => {
      const received = genDiff('./__tests__/__fixtures__/diff/flat/before.json', './__tests__/__fixtures__/diff/flat/after.json', 'diff');
      expect(received).toBe(expected);
    });
    test('.yml/.yaml', () => {
      const received = genDiff('./__tests__/__fixtures__/diff/flat/before.yml', './__tests__/__fixtures__/diff/flat/after.yml', 'diff');
      expect(received).toBe(expected);
    });
    test('.ini', () => {
      const received = genDiff('./__tests__/__fixtures__/diff/flat/before.ini', './__tests__/__fixtures__/diff/flat/after.ini', 'diff');
      expect(received).toBe(expected);
    });
  });
  describe('complex files test', () => {
    const expected = fs.readFileSync('./__tests__/__fixtures__/diff/complex/result.txt', 'utf8');
    test('.json', () => {
      const received = genDiff('./__tests__/__fixtures__/diff/complex/before.json', './__tests__/__fixtures__/diff/complex/after.json', 'diff');
      expect(received).toBe(expected);
    });
    test('.yml/.yaml', () => {
      const received = genDiff('./__tests__/__fixtures__/diff/complex/before.yml', './__tests__/__fixtures__/diff/complex/after.yml', 'diff');
      expect(received).toBe(expected);
    });
    test('.ini', () => {
      const received = genDiff('./__tests__/__fixtures__/diff/complex/before.ini', './__tests__/__fixtures__/diff/complex/after.ini', 'diff');
      expect(received).toBe(expected);
    });
  });
});

describe('plain and json test', () => {
  describe('plain test', () => {
    const expected = fs.readFileSync('./__tests__/__fixtures__/plain/result.txt', 'utf8');
    test('.json', () => {
      const received = genDiff('./__tests__/__fixtures__/plain/before.json', './__tests__/__fixtures__/plain/after.json', 'plain');
      expect(received).toBe(expected);
    });
    test('.yml/.yaml', () => {
      const received = genDiff('./__tests__/__fixtures__/plain/before.yml', './__tests__/__fixtures__/plain/after.yml', 'plain');
      expect(received).toBe(expected);
    });
    test('.ini', () => {
      const received = genDiff('./__tests__/__fixtures__/plain/before.ini', './__tests__/__fixtures__/plain/after.ini', 'plain');
      expect(received).toBe(expected);
    });
  });
  describe('json output test', () => {
    const expected = fs.readFileSync('./__tests__/__fixtures__/json/result.txt', 'utf8');
    test('.ini - .yml test', () => {
      const received = genDiff('./__tests__/__fixtures__/plain/before.ini', './__tests__/__fixtures__/plain/after.yml', 'json');
      expect(received).toBe(expected);
    });
  });
});
