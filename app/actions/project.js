import { List, Record, Map } from 'immutable';
const nodePath = require('path');

import randomId from '../utils/randomId';
import { execute as doExecuteRequest } from '../pragma/RequestExecutor';
import prepareRequest from '../pragma/prepareRequest';
import { awaitingResponse, receiveResponse, receiveError } from './response';
import { readProject } from '../utils/projectUtils';

export const UPSERT_PROJECT = 'UPSERT_PROJECT';
export const CLOSE_PROJECT = 'CLOSE_PROJECT';
export const ADD_REQUEST = 'ADD_REQUEST';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const EXECUTE_REQUEST = 'EXECUTE_REQUEST';

export const Request = Record({
  id: undefined,
  projectId: undefined,
  name: undefined,
  method: undefined,
  url: undefined,
  body: undefined,
  headers: new Map()
});

export const Project = Record({
  id: undefined,
  name: undefined,
  path: undefined,
  requests: new List()
});

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
    }).catch((err) => {
      console.log(err); //TODO communicate in UI
      dispatch(closeProjectByPath(projectPath));
    });
  };
}

export function newProject(path, name) {
  return {
    type: UPSERT_PROJECT,
    project: {
      id: randomId(),
      path: nodePath.join(path, `${name}.json`),
      name: name,
      requests: []
    }
  }
}

export function closeProject(project) {
  return {
    type: CLOSE_PROJECT,
    project: project
  }
}

export function closeProjectByPath(path) {
  return {
    type: CLOSE_PROJECT,
    path: path
  }
}

export function addRequest(request, projectId) {
  const newRequest = request.set('id', randomId()).set('projectId', projectId);

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

export function executeRequest(method:string, url:string, headers:Object, body:?string) {
  return (dispatch, getState) => {
    const state = getState();
    const activeEnvironmentId = state.ui.get('activeEnvironment');
    const activeEnvironment = state.environments.find(e => e.get('id') === activeEnvironmentId);

    let request;
    try {
      request = prepareRequest(method, url, headers, body, activeEnvironment);
    } catch (e) {
      dispatch(receiveError(e));
      return;
    }

    const cancelRequest = doExecuteRequest(request, (error, response) => {
      if (error)
        dispatch(receiveError(error));
      else
        dispatch(receiveResponse(response));
    });

    dispatch(awaitingResponse({cancel: cancelRequest}));
  }
}

