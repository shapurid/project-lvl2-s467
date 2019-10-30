import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parsers = {
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
  '.json': JSON.parse,
};

export default (data) => parsers[path.extname(data)](fs.readFileSync(data, 'utf8'));
