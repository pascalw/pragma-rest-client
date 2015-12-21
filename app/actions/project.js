export const OPEN_PROJECT = 'OPEN_PROJECT';

export function openProject(projectPath) {
  return {
    type: OPEN_PROJECT,
    path: projectPath
  };
}
