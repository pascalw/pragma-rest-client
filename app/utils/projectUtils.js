let fs = require('fs');

export function readProject(path) {
  return new Promise(
    (resolve, reject) => {
      fs.readFile(path, (err, data) => {
        resolve(JSON.parse(data));
      });
    }
  )
}
