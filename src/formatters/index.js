import renderDiff from './diff';
import renderPlain from './plain';
import renderJSON from './toJson';

const formatters = {
  diff: renderDiff,
  plain: renderPlain,
  json: renderJSON,
};

export default (ast, format) => formatters[format](ast);
