
const cliColor = require("cli-color");
const fs = require('fs');
const buildRelativePath = require('./buildRelativePath');

// util
function rewriteFile({ finalDest, src, dest, libFile }, content) {
  fs.writeFile(finalDest, content, (err) => {
    if(err) {
        console.log(err);
    }
      console.log('\n', 'src: ', src, '\ndest: ', dest);
      console.log(`Library created: ${cliColor.blueBright(buildRelativePath(src, dest, libFile))}`);
  }); // write to file
}

module.exports = rewriteFile;
