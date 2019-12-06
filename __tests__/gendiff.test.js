import fs from 'fs';
import genDiff from '../src';

test.each`
  dirPath          | outputFormat | formatOfFile
  ${'flatDiff'}    | ${'diff'}    | ${'.json'}
  ${'flatDiff'}    | ${'diff'}    | ${'.yml'}
  ${'flatDiff'}    | ${'diff'}    | ${'.ini'}
  ${'complexDiff'} | ${'diff'}    | ${'.json'}
  ${'complexDiff'} | ${'diff'}    | ${'.yml'}
  ${'complexDiff'} | ${'diff'}    | ${'.ini'}
  ${'plain'}       | ${'plain'}   | ${'.json'}
  ${'plain'}       | ${'plain'}   | ${'.yml'}
  ${'plain'}       | ${'plain'}   | ${'.ini'}
  ${'json'}        | ${'json'}    | ${'.json'}
  ${'json'}        | ${'json'}    | ${'.yml'}
  ${'json'}        | ${'json'}    | ${'.ini'}
`("Checking the construction of '$dirPath' difference between two files with '$formatOfFile' extension", ({ dirPath, outputFormat, formatOfFile }) => {
  const beforeFilePath = `./__tests__/__fixtures__/${dirPath}/before${formatOfFile}`;
  const afterFilePath = `./__tests__/__fixtures__/${dirPath}/after${formatOfFile}`;
  const expected = fs.readFileSync(`./__tests__/__fixtures__/${dirPath}/result.txt`, 'utf8').trim();
  const actual = genDiff(beforeFilePath, afterFilePath, outputFormat);
  expect(actual).toBe(expected);
});
