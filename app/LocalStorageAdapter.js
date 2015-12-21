class ProjectObserver {
  constructor(store, localStorage) {
    this.previousProject = localStorage.getItem('currentProject');

    store.subscribe(() => {
      const project = store.getState().project;

      if (project !== null && this.previousProject != project) {
        this.previousProject = project;
        console.log('updating');
        project && localStorage.setItem('currentProject', project.projectPath);
      }
    })
  }

  getInitialState() {
    return {project: this.previousProject}
  }
}

export default ProjectObserver;
