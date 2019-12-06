import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.parse,
};

export default (contentOfFile, extension) => parsers[extension](contentOfFile);
