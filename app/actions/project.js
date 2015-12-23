import RequestExecutor from '../RequestExecutor';
import { receiveResponse } from './response';
import { readProject } from '../utils/projectUtils';

export const NEW_PROJECT = 'NEW_PROJECT';
export const UPSERT_PROJECT = 'UPSERT_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const ADD_REQUEST = 'ADD_REQUEST';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const EXECUTE_REQUEST = 'EXECUTE_REQUEST';

export function upsertProject(projectPath) {
  return dispatch => {
    readProject(projectPath).then((project) => {
      const requests = project.requests.map(r => {
        r.projectId = project.id;
        return r;
      });

      dispatch({
        type: UPSERT_PROJECT,
        project: {
          path: projectPath,
          id: project.id,
          name: project.name,
          requests: requests
        }
      });
    });
  };
}

export function addRequest(request, projectId) {
  const newRequest = Object.assign({}, request, {
    id: Math.random().toString(32).slice(2).substr(0, 5),
    projectId: projectId
  });

  return {
    type: ADD_REQUEST,
    projectId: projectId,
    request: newRequest
  }
}

export function updateRequest(request) {
  return {
    type: UPDATE_REQUEST,
    request: request
  }
}

export function deleteRequest(request) {
  return {
    type: DELETE_REQUEST,
    request: request
  }
}

export function executeRequest(request) {
  return dispatch => {
    new RequestExecutor().execute(request).then((result) => {
      dispatch(receiveResponse(result.text, request));
    });
  };
}
