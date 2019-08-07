const fs = require('fs');
const path = require('path');

const { PWD: ROOT_DIR } = process.env; // destruct PWD as the new variable `ROOT_DIR`

function _baseFormat(lib, cb) {
  const defaults = { libFile: 'index.js', ignore: [], ascending: true };
  const { src, dest, ignore, libFile, ascending } = { ...defaults, ...lib};

  let content = '';

  if(ascending) {
    Array.prototype.ordered = Array.prototype.sort;
  } else {
    Array.prototype.ordered = Array.prototype.reverse;
  }

  fs.readdirSync(src).ordered().forEach((file) => {
    let notIgnored = ![...ignore].some(ignoreFile => {
      let patt = new RegExp(ignoreFile);
      return (
        patt.test(file) ||
        ((src === dest) && (file === libFile))
      );
    });

    if(notIgnored) {
      content += cb(file);
    }
  });
  return content;
}

// ====================  lib format builders  ====================

function requireIn(lib) {
  const { src } = lib;

  let libContent = 'module.exports = {';
  libContent += _baseFormat(lib, (file) => {
    let [fileName] = file.split('.js');
    return `\n\t${fileName}: require('${path.resolve(ROOT_DIR, src, './'+fileName)}'),`;
  });

  libContent += '\n};';
  return libContent;
}


function importIn(lib) {
  const { src } = lib;
  return _baseFormat(lib, (file) => {
    let [fileName] = file.split('.js');
    return `\nexport * from '${path.resolve(ROOT_DIR, src, './'+fileName)}';`;
  });
}


function sassImportIn(lib) {
  const { src, libFile } = { libFile: 'main.sass', ...lib};

  return _baseFormat(lib, (file) => {
     let tempContent = '';
     const [prefix, adjustFileName] = file.split('_');

     if(!prefix) {
       let [fileName, fileExtention] = adjustFileName.split('.');
       tempContent +=  `@import '${path.resolve(ROOT_DIR, src, './'+fileName)}'\n`;
       if(libFile.split('.')[1] === 'scss') {
         tempContent += ';';
       }
     }
     return tempContent;
  });
}


module.exports = {
  requireIn,
  importIn,
  sassImportIn,
};
