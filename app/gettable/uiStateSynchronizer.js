import { selectEnvironment } from '../actions/ui';

const LS_KEY = 'ui';
const initialState = (() => {
  const stored = localStorage.getItem(LS_KEY);
  return stored ? JSON.parse(stored) : null;
})();

export default function syncUiState(store) {
  if (initialState !== null) {
    store.dispatch(selectEnvironment({id: initialState.activeEnvironment}));
  }

  let previousState = null;

  store.subscribe(() => {
    const newState = store.getState();

    if (newState.ui !== previousState) {
      const json = JSON.stringify({activeEnvironment: newState.ui.get('activeEnvironment')});
      localStorage.setItem(LS_KEY, json);

      previousState = newState.ui;
    }
  });
}
