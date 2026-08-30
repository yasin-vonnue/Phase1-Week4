const routes = [];

let store = null;
let outlet = null;

export function register(path, component) {
  routes.push({
    path,
    component,
  });
}

export function matchRoute(path) {
  const pathname = path.split("?")[0];

  const pathSegments = pathname.split("/").filter(Boolean);

  for (const route of routes) {
    const routeSegments = route.path.split("/").filter(Boolean);

    if (routeSegments.length !== pathSegments.length) {
      continue;
    }

    const params = {};
    let matched = true;

    for (let index = 0; index < routeSegments.length; index += 1) {
      const routeSegment = routeSegments[index];
      const pathSegment = pathSegments[index];

      if (routeSegment.startsWith(":")) {
        const paramName = routeSegment.slice(1);

        params[paramName] = decodeURIComponent(pathSegment);
      } else if (routeSegment !== pathSegment) {
        matched = false;
        break;
      }
    }

    if (matched) {
      return {
        component: route.component,
        params,
      };
    }
  }

  return null;
}

function renderRoute(match) {
  if (!outlet) {
    return;
  }

  outlet.innerHTML = "";

  const element = match.component(match.params, store);

  if (element) {
    outlet.append(element);
  }
}

export function navigate(path, options = {}) {
  const { replace = false } = options;

  const match = matchRoute(path);

  if (!match) {
    console.error(`No route found for "${path}"`);
    return;
  }

  if (replace) {
    window.history.replaceState({}, "", path);
  } else {
    window.history.pushState({}, "", path);
  }

  store.dispatch({
    type: "ROUTE_CHANGED",
    payload: {
      path,
      params: match.params,
    },
  });
}

function handlePopState() {
  const path = `${window.location.pathname}${window.location.search}`;

  const match = matchRoute(path);

  if (!match) {
    console.error(`No route found for "${path}"`);
    return;
  }

  store.dispatch({
    type: "ROUTE_CHANGED",
    payload: {
      path,
      params: match.params,
    },
  });
}

export function initRouter({ root, stateStore }) {
  outlet = root;
  store = stateStore;

  window.addEventListener("popstate", handlePopState);

  store.subscribe(() => {
    const path = `${window.location.pathname}${window.location.search}`;

    const match = matchRoute(path);

    if (match) {
      renderRoute(match);
    }
  });
}
