import { Project, Request, UPSERT_PROJECT, CLOSE_PROJECT, ADD_REQUEST, UPDATE_REQUEST, DELETE_REQUEST } from '../actions/project';
import { readProject } from '../utils/projectUtils';
import Immutable, { List, Record, Map } from 'immutable';

let findIndex = (state, id) => {
  return state.findIndex(p => p.id == id);
};

export default function projects(state = new List(), action) {
  let idx, currentProject;

  switch (action.type) {
    case UPSERT_PROJECT:
      idx = findIndex(state, action.project.id);

      var requests = new List(action.project.requests.map(r => new Request(Immutable.fromJS(r))));
      var project = new Project({...action.project, requests: requests});

      return idx === -1 ? state.push(project) : state.set(idx, project);
    case CLOSE_PROJECT:
      idx = findIndex(state, action.project.id);
      return state.delete(idx);
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
