import { ADD_REQUEST, UPDATE_REQUEST } from '../actions/request';

export default function requests(state = [], action) {
  switch (action.type) {
    case ADD_REQUEST:
      return [...state, action.request];
    case UPDATE_REQUEST:
      const idx = state.findIndex((r) => r.id == action.request.id);
      return [
        ...state.slice(0, idx),
        action.request,
        ...state.slice(idx + 1)
      ];
    default:
      return state;
  }
}
