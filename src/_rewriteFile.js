
const cliColor = require("cli-color");
const fs = require('fs');
const path = require('path');

// util
function rewriteFile({ finalDest, src, dest, libFile }, content) {
  fs.writeFile(finalDest, content, (err) => {
    if(err) {
        console.log(err);
    }
      console.log('\n', 'src: ', src);
      console.log(`Library created: ${cliColor.blueBright(path.normalize(dest, libFile))}`);
  }); // write to file
}

module.exports = rewriteFile;
