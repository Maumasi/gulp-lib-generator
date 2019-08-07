
const cliColor = require("cli-color");
const fs = require('fs');
const path = require('path');


// util
function rewriteFile(filePath, content) {
  fs.writeFile(filePath, content, (err) => {
    if(err) {
        console.log(err);
    }
      console.log(`Lib created: ${cliColor.blueBright(filePath)}`);
  }); // write to file
}

module.exports = rewriteFile;
