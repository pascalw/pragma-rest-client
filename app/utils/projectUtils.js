let fs = require('fs');

export function readProject(path) {
  return new Promise(
    (resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err)
          reject(err);
        else
          resolve(JSON.parse(data));
      });
    }
  )
}

export function writeProject(project) {
  const path = project.path;

  const projectToSerialize = Object.assign({}, project, {
    path: undefined,
    requests: project.requests.map(r => {
      return Object.assign({}, r, {projectId: undefined});
    })
  });

  const json = JSON.stringify(projectToSerialize, null, 4) + "\n";

  return new Promise(
    (resolve, reject) => {
      fs.writeFile(path, json, (err) => {
        if (err)
          return reject(err);

        resolve();
      });
    }
  );
}
