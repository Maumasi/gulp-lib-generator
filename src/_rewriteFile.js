
const cliColor = require("cli-color");
const fs = require('fs');
const buildRelativePath = require('./buildRelativePath');

// util
function rewriteFile({ finalDest, src }, content) {
  fs.writeFile(finalDest, content, (err) => {
    if(err) {
        console.log(err);
    }
      console.log(`Library created: ${cliColor.blueBright(src)});
  }); // write to file
}

module.exports = rewriteFile;
