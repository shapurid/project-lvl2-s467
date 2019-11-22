import fs from 'fs';
import genDiff from '../src';

const formats = ['json', 'yml', 'ini'];
const typesOfTest = ['flatDiff', 'complexDiff', 'plain', 'json'];
const getFixturePath = (dirPath, name = 'result.txt') => `./__tests__/__fixtures__/${dirPath}/${name}`;

describe.each(typesOfTest)('%s', (type) => {
  const expected = fs.readFileSync(getFixturePath(type), 'utf8').trim();
  test.each(formats)('%s', (format) => {
    const beforePath = getFixturePath(type, `before.${format}`);
    const afterPath = getFixturePath(type, `after.${format}`);
    const actual = genDiff(beforePath, afterPath, type === 'complexDiff' || type === 'flatDiff' ? 'diff' : type);
    expect(actual).toBe(expected);
  });
});
