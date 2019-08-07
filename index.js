
const fs = require('fs');
const path = require('path');

const{ REQUIRE, IMPORT, SASS } = require('./src/_types');

const { PWD: ROOT_DIR } = process.env; // destruct PWD as the new variable `ROOT_DIR`

const rewriteFile = require('./src/_rewriteFile');
const { requireIn, importIn, sassImportIn} = require('./src/_formatType');

function exportLibraries(libArray) {
  // const defaults = { type: REQUIRE, libFile: 'index.js', ignore: [], ascending: true };
  // using closure to maintain data
  const libPaths = libArray.map((lib) => {
    const defaults = { type: REQUIRE, libFile: 'index.js', ignore: [], ascending: true };
    let tempObj = { ...defaults, ...lib };
    console.log(tempObj);
    if(!tempObj.dest) {
      tempObj.dest = tempObj.src;
    }
    tempObj.finalDest = path.resolve(ROOT_DIR, tempObj.dest, './'+tempObj.libFile);

    if(tempObj.dest === tempObj.src) {
      tempObj.ignore.push(tempObj.libFile);
    }

    return tempObj;
  });

  // return gulp task with libary array
  return (done) => {
    libPaths.forEach((lib) => {
      fs.readdir(lib.finalDest, (err, data) => {
        try {
          let newLibIndex = '';
          if(lib.type === REQUIRE) {
            newLibIndex = requireIn(lib);
          } else if(lib.type === IMPORT) {
            newLibIndex = importIn(lib);
          } else if(lib.type === SASS) {
            newLibIndex = sassImportIn(lib);
          }
          rewriteFile(lib.finalDest, newLibIndex);
          //
        } catch(e) {
          if(e) {
            rewriteFile(lib.finalDest, data);
            console.log('There was an error, so file was reverted to previous version.');
            console.log(e);
          }
        }
      });
    });
    done();
  }
}

module.exports = exportLibraries;
