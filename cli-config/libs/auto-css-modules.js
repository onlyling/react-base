const { extname } = require('path');
const helpers = require('../helper');

const CSS_FILE_EXTENSIONS = ['.css', '.scss', '.sass', '.less'];

module.exports = () => {
  return {
    visitor: {
      ImportDeclaration(path) {
        const { specifiers, source } = path.node;
        const { value } = source;
        if (specifiers.length > 0 && CSS_FILE_EXTENSIONS.includes(extname(value))) {
          source.value = `${value}?${helpers.CSS_MODULES_MARKER}`;
        }
      },
    },
  };
};
