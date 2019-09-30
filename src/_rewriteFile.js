
const cliColor = require("cli-color");
const fs = require('fs');

// util
function rewriteFile({ finalDest, src }, content) {
  fs.writeFile(finalDest, content, (err) => {
    if(err) {
        console.log(err);
    }
      console.log(`Lib created for DIR: ${cliColor.blueBright(src)}`);
  }); // write to file
}

module.exports = rewriteFile;
