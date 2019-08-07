
const fs = require('fs');
const path = require('path');

const { PWD: ROOT_DIR } = process.env; // destruct PWD as the new variable `ROOT_DIR`

const rewriteFile = require(path.resolve(ROOT_DIR, './src/_rewriteFile'));
const { requireIn, importIn, sassImportIn} = require(path.resolve(ROOT_DIR, './src/_formatType'));

function exportLibraries(libArray) {
  // using closure to maintain data
  const libPaths = libArray.map((lib) => {
    let tempObj = lib;
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
          if(lib.type === 'REQUIRE') {
            newLibIndex = requireIn(lib);
          } else if(lib.type === 'IMPORT') {
            newLibIndex = importIn(lib);
          } else if(lib.type === 'SASS') {
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