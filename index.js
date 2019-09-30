
const fs = require('fs');
const path = require('path');

const{ CUSTOM, REQUIRE, IMPORT, SASS } = require('./src/_types');

// const { PWD: ROOT_DIR } = process.env; // destruct PWD as the new variable `ROOT_DIR`

const rewriteFile = require('./src/_rewriteFile');
const createRelativePath = require('./src/createRelativePath');
const buildRelativePath = require('./src/buildRelativePath');

const { customImportIn, requireIn, importIn, sassImportIn } = require('./src/_formatType');

function createLib(libArray) {
  const defaults = {
    type: REQUIRE,
    libFile: 'index.js',
    ignore: [],
    ascending: true,
    src: null,
    dest: null,
    customFormat(fileName, index, isLastFile, self) { return null },
  };
  // using closure to maintain data
  const libPaths = libArray.map((lib) => {
    let tempObj = { ...defaults, ...lib };
    if(!tempObj.dest) {
      tempObj.dest = tempObj.src;
    }

    // const relPath = path.join(
    //     path.basename(tempObj.src), '/', path.basename('./'+tempObj.libFile)
    //   );
    //
    // tempObj.finalDest = './' + relPath;
    tempObj.finalDest = path.resolve(tempObj.dest, './'+tempObj.libFile);
    //
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
          } else if(lib.type === CUSTOM) {
            newLibIndex = customImportIn(lib);
          }
          rewriteFile(lib, newLibIndex);
          //
        } catch(e) {
          if(e) {
            rewriteFile(lib, data);
            console.log('Error creating the library for: '+ lib.src);
            console.log(e);
          }
        } // catch
      }); // fs.readdir
    }); // libPaths.forEach
    done();
  } // return func
}

module.exports = { createLib, createRelativePath };
