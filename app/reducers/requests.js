import { ADD_REQUEST } from '../actions/request';

export default function requests(state = [], action) {
  switch (action.type) {
    case ADD_REQUEST:
      return [...state, action.request];
    default:
      return state;
  }
}
