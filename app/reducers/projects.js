import { UPSERT_PROJECT, ADD_REQUEST, UPDATE_REQUEST, DELETE_REQUEST } from '../actions/project';
import { readProject } from '../utils/projectUtils';
import { List, Record } from 'immutable';

let findIndex = (state, id) => {
  return state.findIndex(p => p.id == id);
};

let Project = Record({
  id: undefined,
  name: undefined,
  path: undefined,
  requests: new List()
});

export default function projects(state = new List(), action) {
  let idx, currentProject;

  switch (action.type) {
    case UPSERT_PROJECT:
      idx = findIndex(state, action.project.id);
      var project = new Project(action.project);
      return idx === -1 ? state.push(project) : state.set(idx, project);
    case ADD_REQUEST:
      idx = findIndex(state, action.projectId);
      return state.update(idx, project => {
        return project.set('requests', project.requests.push(action.request));
      });
    case UPDATE_REQUEST:
      idx = findIndex(state, action.request.projectId);
      currentProject = state[idx];

      return state.update(idx, project => {
        let requestIdx = project.requests.findIndex(r => r.id === action.request.id);
        return project.set('requests', project.requests.set(requestIdx, action.request));
      });
    case DELETE_REQUEST:
      idx = findIndex(state, action.request.projectId);
      currentProject = state[idx];

      return state.update(idx, project => {
        let requestIdx = project.requests.findIndex(r => r.id === action.request.id);
        return project.set('requests', project.requests.delete(requestIdx));
      });
    default:
      return state;
  }
}
