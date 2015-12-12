import { ADD_REQUEST, UPDATE_REQUEST, DELETE_REQUEST, RELOAD_ALL } from '../actions/request';

let findIndex = (state, request) => {
  return state.findIndex((r) => r.id == request.id);
};

export default function requests(state = [], action) {
  let idx = null;

  switch (action.type) {
    case ADD_REQUEST:
      return [...state, action.request];
    case UPDATE_REQUEST:
      idx = findIndex(state, action.request);
      return [
        ...state.slice(0, idx),
        action.request,
        ...state.slice(idx + 1)
      ];
    case DELETE_REQUEST:
      idx = findIndex(state, action.request);
      return [
        ...state.slice(0, idx),
        ...state.slice(idx + 1)
      ];
    case RELOAD_ALL:
      return action.requests;
    default:
      return state;
  }
}
