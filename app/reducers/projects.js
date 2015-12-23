import { UPSERT_PROJECT, ADD_REQUEST, UPDATE_REQUEST, DELETE_REQUEST } from '../actions/project';
import { readProject } from '../utils/projectUtils';

let findIndex = (state, id) => {
  return state.findIndex(p => p.id == id);
};

export default function projects(state = [], action) {
  let idx, currentProject, newProject, requestIdx;

  switch (action.type) {
    case UPSERT_PROJECT:
      idx = findIndex(state, action.project.id);
      return [
        ...state.slice(0, idx),
        action.project,
        ...state.slice(idx + 1)
      ];
    case ADD_REQUEST:
      idx = findIndex(state, action.projectId);
      currentProject = state[idx];
      newProject = Object.assign({}, currentProject, {
        requests: [...currentProject.requests, action.request]
      });

      return [
        ...state.slice(0, idx),
        newProject,
        ...state.slice(idx + 1)
      ];
    case UPDATE_REQUEST:
      idx = findIndex(state, action.request.projectId);
      currentProject = state[idx];
      requestIdx = currentProject.requests.findIndex(r => r.id === action.request.id);

      newProject = Object.assign({}, currentProject, {
        requests: [...currentProject.requests.slice(0, requestIdx), action.request, ...currentProject.requests.slice(requestIdx + 1)]
      });

      return [
        ...state.slice(0, idx),
        newProject,
        ...state.slice(idx + 1)
      ];
    case DELETE_REQUEST:
      idx = findIndex(state, action.request.projectId);
      currentProject = state[idx];
      requestIdx = currentProject.requests.findIndex(r => r.id === action.request.id);

      newProject = Object.assign({}, state[idx], {
        requests: [...currentProject.requests.slice(0, requestIdx), ...currentProject.requests.slice(requestIdx + 1)]
      });

      return [
        ...state.slice(0, idx),
        newProject,
        ...state.slice(idx + 1)
      ];
    default:
      return state;
  }
}
