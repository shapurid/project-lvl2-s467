import renderDiff from './diff';
import renderPlain from './plain';

const formatters = {
  diff: renderDiff,
  plain: renderPlain,
  json: JSON.stringify,
};

export default (ast, format) => formatters[format](ast);
