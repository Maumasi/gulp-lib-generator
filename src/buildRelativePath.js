
const path = require('path');

function buildRelativePath(souce, destination, filename) {
  const tempSrc = souce.split('/');
  const tempDest = destination.split('/');
  let pathBackup = [];
  let pathForward = [];
  let diverged = false;
  //
  if(tempSrc.length > tempDest.length) {
    tempSrc.forEach((el, i) => {
      if((el !== tempDest[i]) && (i < tempDest.length)) {
        diverged = true;
      }
      //
      if(diverged && (i < tempDest.length)) {
        pathBackup.push('../');
        pathForward.push(el);
      } else if(diverged && (i >= tempDest.length)) {
        pathForward.push(el);
      }
    });
    //
    if(!diverged) {
      pathBackup = [];
      pathBackup.push('./');
    }
    //
    return path.join(...pathBackup, ...pathForward, filename);
    //
    //
  } else {
    tempDest.forEach((el, i) => {
      if((el !== tempSrc[i]) && (i < tempSrc.length)) {
        diverged = true;
      }
      //
      if(diverged && (i < tempSrc.length)) {
        pathBackup.push('../');
        pathForward.push(tempSrc[i]);
        console.log('pathForward: ', pathForward);
      } else if(diverged && (i >= tempSrc.length)) {
        pathBackup.push('../');
      }
    });
    //
    if(!diverged) {
      pathBackup = [];
      pathBackup.push('./');
    }
    //
    return path.join(...pathBackup, ...pathForward, filename);
  }
}

// function buildRelativePath(souce, destination, filename) {
//   let nPth = '';
//   let newPth = [];
//   let pathSegements = [];
//   let isDifPath = false;
//   let lastSharedPath = null;
//   src.forEach((p, i) => {
//     if((i < dest.length) && !isDifPath) {
//       if((p === dest[i])) {
//         lastSharedPath = p;
//       } else {
//         isDifPath = true;
//       }
//     }
//     //
//     if((p !== dest[i])) {
//       newPth.push(p);
//     }
//   });
//
//   if(lastSharedPath) {
//     dest.forEach((p, i) => {
//       if(i-1 <= dest.indexOf(lastSharedPath)) {
//         pathSegements.push('../');
//       }
//     });
//   }
//
//   if(newPth) {
//     newPth.forEach(p => {
//       pathSegements.push(p+'/');
//     });
//   }
//   return path.join(...pathSegements, filename);
// }

module.exports = buildRelativePath;
