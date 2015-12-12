import { reloadAllRequests } from './actions/request';

let fs = require('fs');
var chokidar = require('chokidar');
let PATH = '/Users/Pascal/Desktop/rest-tool-test/moon.json';

class Project {
  constructor(store) {
    this.store = store;
    this.previousState = {};

    this.reloadState();
    this.store.subscribe(this.writeState.bind(this));
  }

  reloadState() {
    console.log('reloading state!');
    this.readProject().then(({ requests }) => {
      this.previousState = {requests: requests};
      this.store.dispatch(reloadAllRequests(requests));
    });
  }

  writeState() {
    if (this.previousState.requests === undefined || this.previousState.requests != this.store.getState().requests) {
      this.readProject().then((project) => {
        project.requests = this.store.getState().requests;

        this.stopWatching();

        this.writeProject(project).then(() => {
          console.log("The file was saved!");
          this.watch();
        });

        this.previousState = this.store.getState();
      });
    }
  }

  keepInSync = this.watch;

  watch() {
    this.stopWatching();
    this.watcher = chokidar.watch(PATH, {ignoreInitial: true}).on('all', this.reloadState.bind(this));
  }

  stopWatching() {
    this.watcher && this.watcher.close();
  }

  readProject() {
    return new Promise(
      (resolve, reject) => {
        fs.readFile(PATH, (err, data) => {
          let project = JSON.parse(data);
          resolve(project);
        });
      }
    )
  }

  writeProject(project) {
    return new Promise(
      (resolve, reject) => {
        fs.writeFile(PATH, JSON.stringify(project, null, 4), (err) => {
          if (err)
            return reject(err);

          resolve();
        });
      }
    );
  }
}

export default Project;
