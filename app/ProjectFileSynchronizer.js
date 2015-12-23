import { writeProject } from './utils/projectUtils';
import { upsertProject } from './actions/project';
var chokidar = require('chokidar');

class ProjectFileSynchronizer {
  constructor(store) {
    this.store = store;
    this.watcher = chokidar.watch([], {ignoreInitial: true}).on('all', this.onFileChange.bind(this));
    this.previousState = null;
  }

  onFileChange(_, path) {
    this.store.dispatch(upsertProject(path));
  }

  saveOpenProjects(projects) {
    const projectPaths = projects.map(p => p.path);
    localStorage.setItem('openProjects', JSON.stringify(projectPaths));
  }

  initWatcher(path) {
    this.watcher.add(path);
  }

  stopWatcher(path) {
    this.watcher.unwatch(path);
  }

  restoreProjects() {
    let openProjects = localStorage.getItem('openProjects');

    if (openProjects) {
      openProjects = JSON.parse(openProjects);
      openProjects.forEach(projectPath => {
        this.store.dispatch(upsertProject(projectPath));
      });
    }
  }

  withWatcherPaused(path, promise) {
    this.stopWatcher(path);
    let initWatcherForPath = () => {
      setTimeout(() => {
        // wait a bit before enabling watchers again. This works around some timing issues.
        // proper solution tbd :-)
        this.initWatcher(path);
      }, 1000);
    };

    promise.then(initWatcherForPath, initWatcherForPath);
  }

  syncProjectsToDisk() {
    this.restoreProjects();

    this.store.subscribe(() => {
      const currentProjectsState = this.store.getState().projects;

      if (currentProjectsState !== this.previousState) {
        if (this.previousState !== null) {
          this.saveOpenProjects(currentProjectsState);

          currentProjectsState.forEach((project, index) => {
            if (project !== this.previousState[index]) {
              console.log('State change for ', project.path);

              this.withWatcherPaused(project.path, writeProject(project));
            }
          });
        }

        this.previousState = currentProjectsState;
      }
    });
  }
}

export function syncProjectsToDisk(store) {
  let synchronizer = new ProjectFileSynchronizer(store);
  synchronizer.syncProjectsToDisk();
}
