
const path = require('path');

function createRelativePath(...paths) {
  const mappedPaths = paths.map(path.basename);
  return path.join(...mappedPaths);
}

module.exports = createRelativePath;
