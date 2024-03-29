
const path = require('path');

function buildRelativePath(souce, destination, filename) {
  const tempSrc = path.normalize(souce).split('/');
  const tempDest = path.normalize(destination).split('/');
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
        if((i - tempDest.length) > 1) {
          pathBackup.push('../');
        }
        pathForward.push(el);
      } else if(i >= tempDest.length) {
        pathForward.push(el);
      }
    });
    //
    if(!diverged) {
      pathBackup = ['./'];
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
        if((i - tempDest.length) > 1) {
          pathBackup.push('../');
        }
        pathForward.push(tempSrc[i]);
      } else if(diverged && (i >= tempSrc.length)) {
        pathBackup.push('../');
      }
    });
    //
    if(!diverged) {
      pathBackup = ['./'];
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
