
const path = require('path');

function createRelativePath(...paths) {
  const mappedPaths = paths.map(p => path.basename(p));
  return path.join(...mappedPaths);
}

module.exports = createRelativePath;
