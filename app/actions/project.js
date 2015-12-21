export const OPEN_PROJECT = 'OPEN_PROJECT';
export const NEW_PROJECT = 'NEW_PROJECT';

export function openProject(projectPath) {
  return {
    type: OPEN_PROJECT,
    path: projectPath
  };
}

export function newProject(projectPath, projectName) {
  return {
    type: NEW_PROJECT,
    name: projectName,
    path: `${projectPath}/${projectName}.json`
  };
}
