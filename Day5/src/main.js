import { createStore } from "./state/store.js";
import { initialState } from "./state/initialState.js";
import { reducer } from "./state/reducer.js";

import { register, navigate, initRouter } from "./router.js";

import { renderHome } from "./pages/Home.js";
import { renderList } from "./pages/List.js";
import { renderDetail } from "./pages/Detail.js";
import { renderSettings } from "./pages/Settings.js";

const store = createStore(initialState, reducer);

store.subscribe(() => {
  console.log("Route state changed:", store.getState().route);
});

const app = document.querySelector("#app");

register("/home", renderHome);
register("/list", renderList);
register("/detail/:id", renderDetail);
register("/settings", renderSettings);

initRouter({
  root: app,
  stateStore: store,
});

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const link = event.target.closest("[data-link]");

  if (!link) {
    return;
  }

  event.preventDefault();

  const path = link.getAttribute("href");

  if (!path) {
    return;
  }

  navigate(path);
});

// console.log("Store: ", store.getState());
// console.log("Routes registered successfully");

// console.log("HOME:", matchRoute("/home"));
// console.log("LIST:", matchRoute("/list"));
// console.log("SETTINGS:", matchRoute("/settings"));
// console.log("DETAIL:", matchRoute("/detail/42"));
// console.log("DETAIL 123:", matchRoute("/detail/123"));
// console.log("ENCODED:", matchRoute("/detail/task%20123"));
// console.log("INVALID:", matchRoute("/something-that-does-not-exist"));
// console.log("WRONG:", matchRoute("/detail"));
// console.log("WRONG 2:", matchRoute("/detail/42/extra"));
// console.log("QUERY:", matchRoute("/detail/42?edit=true"));

// const store = createStore(initialState, reducer);

// console.log("Initial state:", store.getState());

// const unsubscribe = store.subscribe(() => {
//   console.log("State changed:", store.getState());
// });

// store.dispatch({
//   type: "ROUTE_CHANGED",
//   payload: {
//     path: "/list",
//     params: {},
//   },
// });

// console.log("Unsubscribing...");

// unsubscribe();

// console.log("Dispatching second action");

// store.dispatch({
//   type: "ROUTE_CHANGED",
//   payload: {
//     path: "/settings",
//     params: {},
//   },
// });

// console.log("Final state:", store.getState());
