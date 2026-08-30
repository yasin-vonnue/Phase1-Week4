import { createStore } from "./state/store.js";
import { initialState } from "./state/initialState.js";
import { reducer } from "./state/reducer.js";
import { storageMiddleware, loadState } from "./state/storageMiddleware.js";
import { loadTasks, loadTasksWithError } from "./state/taskActions.js";

import { register, navigate, initRouter } from "./router.js";

import { renderHomePage } from "./pages/Home.js";
import { renderListPage } from "./pages/List.js";
import { renderDetailPage } from "./pages/Detail.js";
import { renderSettingsPage } from "./pages/Settings.js";

const savedState = loadState();

const store = createStore(
  {
    ...initialState,
    ...savedState,
    loading: false,
    error: null,
  },
  reducer,
  storageMiddleware,
);

const app = document.querySelector("#app");

register("/home", renderHomePage);
register("/list", renderListPage);
register("/detail/:id", renderDetailPage);
register("/settings", renderSettingsPage);

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

loadTasks(store.dispatch);

console.log("Initial state:", store.getState());

// const newTask = {
//   id: "2",
//   title: "Learn CSS",
//   description: "Practice animations",
//   completed: false,
// };

// store.dispatch({
//   type: "ADD_TASK",
//   payload: newTask,
// });

// console.log("After ADD:", store.getState().tasks);

// store.dispatch({
//   type: "UPDATE_TASK",
//   payload: {
//     id: "2",
//     title: "Learn Advanced CSS",
//   },
// });

// console.log("After UPDATE:", store.getState().tasks);

// store.dispatch({
//   type: "TOGGLE_TASK",
//   payload: "2",
// });

// console.log("After TOGGLE:", store.getState().tasks);

// store.dispatch({
//   type: "DELETE_TASK",
//   payload: "2",
// });

// console.log("After DELETE:", store.getState().tasks);

// store.dispatch({
//   type: "ADD_TASK",
//   payload: {
//     id: "3",
//     title: "Learn Testing",
//     description: "Practice Vitest",
//     completed: false,
//   },
// });

// store.dispatch({
//   type: "UPDATE_TASK",
//   payload: {
//     id: "3",
//     title: "Learn Advanced Testing",
//   },
// });

// store.dispatch({
//   type: "DELETE_TASK",
//   payload: "3",
// });

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
