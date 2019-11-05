import fs from 'fs';
import genDiff from '../src';

describe('testing diff', () => {
  describe('flat files test', () => {
    const result = fs.readFileSync('./__tests__/__fixtures__/results/diff/resultFlat.txt', 'utf8');
    test('.json', () => {
      const received = genDiff('./__tests__/__fixtures__/files/flat/before.json', './__tests__/__fixtures__/files/flat/after.json', 'diff');
      expect(received).toBe(result);
    });
    test('.yml/.yaml', () => {
      const received = genDiff('./__tests__/__fixtures__/files/flat/before.yml', './__tests__/__fixtures__/files/flat/after.yml', 'diff');
      expect(received).toBe(result);
    });
    test('.ini', () => {
      const received = genDiff('./__tests__/__fixtures__/files/flat/before.ini', './__tests__/__fixtures__/files/flat/after.ini', 'diff');
      expect(received).toBe(result);
    });
  });
  describe('complex files test', () => {
    const result = fs.readFileSync('./__tests__/__fixtures__/results/diff/resultComplex.txt', 'utf8');
    test('.json', () => {
      const received = genDiff('./__tests__/__fixtures__/files/complex/before.json', './__tests__/__fixtures__/files/complex/after.json', 'diff');
      expect(received).toBe(result);
    });
    test('.yml/.yaml', () => {
      const received = genDiff('./__tests__/__fixtures__/files/complex/before.yml', './__tests__/__fixtures__/files/complex/after.yml', 'diff');
      expect(received).toBe(result);
    });
    test('.ini', () => {
      const received = genDiff('./__tests__/__fixtures__/files/complex/before.ini', './__tests__/__fixtures__/files/complex/after.ini', 'diff');
      expect(received).toBe(result);
    });
  });
});

describe('testing plain', () => {
  describe('flat files test', () => {
    const result = fs.readFileSync('./__tests__/__fixtures__/results/plain/resultFlat.txt', 'utf8');
    test('.json', () => {
      const received = genDiff('./__tests__/__fixtures__/files/flat/before.json', './__tests__/__fixtures__/files/flat/after.json', 'plain');
      expect(received).toBe(result);
    });
    test('.yml/.yaml', () => {
      const received = genDiff('./__tests__/__fixtures__/files/flat/before.yml', './__tests__/__fixtures__/files/flat/after.yml', 'plain');
      expect(received).toBe(result);
    });
    test('.ini', () => {
      const received = genDiff('./__tests__/__fixtures__/files/flat/before.ini', './__tests__/__fixtures__/files/flat/after.ini', 'plain');
      expect(received).toBe(result);
    });
  });
  describe('complex files test', () => {
    const result = fs.readFileSync('./__tests__/__fixtures__/results/plain/resultComplex.txt', 'utf8');
    test('.json', () => {
      const received = genDiff('./__tests__/__fixtures__/files/complex/before.json', './__tests__/__fixtures__/files/complex/after.json', 'plain');
      expect(received).toBe(result);
    });
    test('.yml/.yaml', () => {
      const received = genDiff('./__tests__/__fixtures__/files/complex/before.yml', './__tests__/__fixtures__/files/complex/after.yml', 'plain');
      expect(received).toBe(result);
    });
    test('.ini', () => {
      const received = genDiff('./__tests__/__fixtures__/files/complex/before.ini', './__tests__/__fixtures__/files/complex/after.ini', 'plain');
      expect(received).toBe(result);
    });
  });
});
