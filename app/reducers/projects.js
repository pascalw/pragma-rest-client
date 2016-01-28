import { Project, Request, UPSERT_PROJECT, CLOSE_PROJECT, ADD_REQUEST, UPDATE_REQUEST, DELETE_REQUEST } from '../actions/project';
import { readProject } from '../utils/projectUtils';
import Immutable, { List, Record, Map } from 'immutable';

function findIndex(state, fn) {
  return state.findIndex(fn);
}

function findIndexById(state, id) {
  return findIndex(state, p => p.id === id);
}

export default function projects(state = new List(), action) {
  let idx, currentProject;

  switch (action.type) {
    case UPSERT_PROJECT:
      idx = findIndexById(state, action.project.id);

      var requests = new List(action.project.requests.map(r => new Request(Immutable.fromJS(r))));
      var project = new Project({...action.project, requests: requests});

      return idx === -1 ? state.push(project) : state.set(idx, project);
    case CLOSE_PROJECT:
      if (action.path)
        idx = findIndex(state, p => p.path == action.path);
      else
        idx = findIndex(state, p => p.id === action.project.id);

      return state.delete(idx);
    case ADD_REQUEST:
      idx = findIndexById(state, action.projectId);
      return state.update(idx, project => {
        return project.set('requests', project.requests.push(action.request));
      });
    case UPDATE_REQUEST:
      idx = findIndexById(state, action.request.projectId);
      currentProject = state[idx];

      return state.update(idx, project => {
        let requestIdx = project.requests.findIndex(r => r.id === action.request.id);
        return project.set('requests', project.requests.set(requestIdx, action.request));
      });
    case DELETE_REQUEST:
      idx = findIndexById(state, action.request.projectId);
      currentProject = state[idx];

      return state.update(idx, project => {
        let requestIdx = project.requests.findIndex(r => r.id === action.request.id);
        return project.set('requests', project.requests.delete(requestIdx));
      });
    default:
      return state;
  }
}
