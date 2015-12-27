import { writeProject } from '../utils/projectUtils';
import { upsertProject } from '../actions/project';
import { map } from 'lodash/collection';
import { flatten } from 'lodash/array';
import { List } from 'immutable';
var chokidar = require('chokidar');

class Request {
  id:string;
  name:string;
  method:string;
  url:string;

  constructor(id, name, method, url) {
    this.id = id;
    this.name = name;
    this.method = method;
    this.url = url;
  }
}

class Project {
  id:string;
  name:string;
  path:string;
  requests:List<Request>;

  constructor(id, name, path, requests) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.requests = requests;
  }
}

class ProjectFileSynchronizer {
  constructor(store) {
    this.store = store;
    this.writeNextChange = true;
    this.watcher = chokidar.watch([], {ignoreInitial: true}).on('all', this.onFileChange.bind(this));
    this.previousState = null;
  }

  onFileChange(_, path) {
    console.log(`detected change for ${path}`);
    this.writeNextChange = false;
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

    //FIXME: provide promise to know when restoreProjects is completed
    setTimeout(() => {
      this.subscribeToStore();
      this.setupWatchers();
    }, 2000);
  }

  setupWatchers() {
    const projects = this.store.getState().projects;
    const watchedPaths = flatten(map(this.watcher.getWatched(), (items, dir) => {
      return items.map(i => dir + '/' + i);
    }));

    // stop watchers for removed projects
    projects.filter(p => watchedPaths.indexOf(p.path) === -1)
      .forEach(p => this.stopWatcher(p.path));

    projects.forEach(p => {
      if (watchedPaths.indexOf(p.path) === -1) {
        console.log(`Setting up watcher for ${p.path}`);
        this.initWatcher(p.path);
      }
    });
  }

  subscribeToStore() {
    this.store.subscribe(() => {
      const currentProjectsState = this.store.getState().projects;

      if (currentProjectsState !== this.previousState) {
        if (this.previousState !== null) {
          this.saveOpenProjects(currentProjectsState);
          this.setupWatchers();

          currentProjectsState.forEach((project, index) => {
            if (project !== this.previousState[index] && this.writeNextChange) {
              console.log('Writing change for ', project.path);
              const serializedProject = this.serialize(project);
              this.withWatcherPaused(project.path, writeProject(serializedProject));
            }
          });
        }

        this.writeNextChange = true;
        this.previousState = currentProjectsState;
      }
    });
  }

  serialize(project) {
    const requests = project.requests.map(r => {
      return new Request(r.id, r.name, r.method, r.url);
    });

    return new Project(project.id, project.name, project.path, requests);
  }
}

export function syncProjectsToDisk(store) {
  let synchronizer = new ProjectFileSynchronizer(store);
  synchronizer.syncProjectsToDisk();
}
