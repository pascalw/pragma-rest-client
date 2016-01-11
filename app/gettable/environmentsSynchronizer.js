import { upsertEnvironment } from '../actions/environments';

const LS_KEY = 'environments';
const initialState = (() => {
  const stored = localStorage.getItem(LS_KEY);
  return stored ? JSON.parse(stored) : null;
})();

export default function syncEnvironments(store) {
  if (initialState !== null) {
    initialState.forEach(environment => {
      store.dispatch(upsertEnvironment(environment));
    });
  }

  let previousState = null;

  store.subscribe(() => {
    const newState = store.getState();

    if (newState.environments !== previousState) {
      const json = JSON.stringify(newState.environments.toJS());
      localStorage.setItem(LS_KEY, json);

      previousState = newState.environments;
    }
  });
}
