import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

const parsers = {
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.parse,
};

const extractFormat = (pathToFile) => path.extname(pathToFile);

const extractFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf8');

const chooseParser = (format) => parsers[format];

export default (data) => {
  const formatOfFile = extractFormat(data);
  const file = extractFile(data);
  const parse = chooseParser(formatOfFile);

  return parse(file);
};
