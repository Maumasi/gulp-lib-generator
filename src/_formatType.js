const fs = require('fs');
const createRelativePath = require('./createRelativePath');
const buildRelativePath = require('./buildRelativePath');


function _baseFormat(lib, cb) {
  const { src, dest, ignore, libFile, ascending } = lib;
  let content = '';

  if(ascending) {
    Array.prototype.ordered = Array.prototype.sort;
  } else {
    Array.prototype.ordered = Array.prototype.reverse;
  }

  const dirFiles = fs.readdirSync(src).ordered();
  dirFiles.forEach((file, i) => {
    let notIgnored = ![...ignore].some(ignoreFile => {
      let patt = new RegExp(ignoreFile);
      return (
        patt.test(file) ||
        ((src === dest) && (file === libFile))
      );
    });

    if(notIgnored) {
      content += cb(file, i, ((dirFiles.length - 1) === i), lib);
    }
  });
  return content;
}

// ====================  lib format builders  ====================

function requireIn(lib) {
  const { src, dest } = lib;

  let libContent = 'module.exports = {';
  libContent += _baseFormat(lib, (file) => {
    let [fileName] = file.split('.js');
    return `\n\t${fileName}: require('./${buildRelativePath(src, dest, './'+fileName)}'),`;
  });

  libContent += '\n};';
  return libContent;
}


function importIn(lib) {
  const { src, dest } = lib;
  return _baseFormat(lib, (file) => {
    let [fileName] = file.split('.js');
    return `\nexport * from './${buildRelativePath(src, dest, './'+fileName)}';`;
  });
}


function sassImportIn(lib) {
  const { src, dest, libFile } = { libFile: 'main.sass', ...lib};
  return _baseFormat(lib, (file) => {
     let tempContent = '';
     const [prefix, adjustFileName] = file.split('_');

     if(!prefix) {
       let [fileName, fileExtention] = adjustFileName.split('.');
       tempContent +=  `@import './${buildRelativePath(src, dest, './'+fileName)}'\n`;
       if(libFile.split('.')[1] === 'scss') {
         tempContent += ';';
       }
     }
     return tempContent;
  });
}


function customImportIn(lib) {
  return _baseFormat(lib, lib.customFormat);
}


module.exports = {
  customImportIn,
  requireIn,
  importIn,
  sassImportIn,
};
