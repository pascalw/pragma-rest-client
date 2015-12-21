import { reloadAllRequests } from './actions/request';

let fs = require('fs');
var chokidar = require('chokidar');

class Project {
  constructor(store, projectPath) {
    this.store = store;
    this.projectPath = projectPath;
    this.previousState = {};

    this.reloadState().then(() => {
      this.unsubscribeFromStore = this.store.subscribe(this.writeState.bind(this));
    });
  }

  _log(message) {
    console.log(`[${this.projectPath}] ${message}`)
  }

  reloadState() {
    this._log('reloading state!');
    return new Promise((resolve, reject) => {
      this.readProject().then(({ requests }) => {
        this.previousState = {requests: requests};
        this.store.dispatch(reloadAllRequests(requests));
        resolve();
      });
    });
  }

  writeState() {
    if (this.previousState.requests === undefined || this.previousState.requests != this.store.getState().requests) {
      this.readProject().then((project) => {
        project.requests = this.store.getState().requests;

        this.stopWatching();

        this.writeProject(project).then(() => {
          this._log("The file was saved!");
          this.watch();
        });

        this.previousState = this.store.getState();
      });
    }
  }

  keepInSync = this.watch;

  watch() {
    this.stopWatching();
    this.watcher = chokidar.watch(this.projectPath, {ignoreInitial: true}).on('all', this.reloadState.bind(this));
  }

  stopWatching() {
    this.watcher && this.watcher.close();
  }

  close() {
    this.unsubscribeFromStore();
    this.stopWatching();
  }

  readProject() {
    return new Promise(
      (resolve, reject) => {
        fs.readFile(this.projectPath, (err, data) => {
          let project = JSON.parse(data);
          resolve(project);
        });
      }
    )
  }

  writeProject(project) {
    return new Promise(
      (resolve, reject) => {
        fs.writeFile(this.projectPath, JSON.stringify(project, null, 4), (err) => {
          if (err)
            return reject(err);

          resolve();
        });
      }
    );
  }
}

export default Project;
