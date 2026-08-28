export function reducer(state, action) {
  switch (action.type) {
    case "ROUTE_CHANGED":
      return {
        ...state,
        route: action.payload,
      };

    default:
      return state;
  }
}
