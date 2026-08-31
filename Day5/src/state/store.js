export function createStore(initialState, reducer, middleware) {
  let state = initialState;
  const listeners = new Set();

  function getState() {
    return state;
  }

  function baseDispatch(action) {
    state = reducer(state, action);

    listeners.forEach((listener) => {
      listener();
    });

    return action;
  }

  let dispatch = baseDispatch;

  if (middleware) {
    dispatch = middleware({
      getState,
    })(baseDispatch);
  }

  function subscribe(listener) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}
