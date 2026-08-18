export function initRouter() {
  const routes = document.querySelectorAll("[data-page]");
  const navLinks = document.querySelectorAll("[data-route]");

  if (!routes.length || !navLinks.length) {
    return;
  }

  const basePath = window.location.pathname
    .replace(/\/index\.html$/, "")
    .replace(/\/$/, "");

  function getRoutePath() {
    const pathname = window.location.pathname;

    if (pathname === basePath || pathname === `${basePath}/`) {
      return "/";
    }

    const route = pathname.slice(basePath.length);

    return route || "/";
  }

  function renderRoute(path) {
    const normalizedPath = path === "/" ? "/" : path.replace(/\/+$/, "");

    routes.forEach((route) => {
      route.hidden = route.dataset.page !== normalizedPath;
    });

    navLinks.forEach((link) => {
      const linkPath = link.dataset.route;

      const isActive = linkPath === normalizedPath;

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const route = link.dataset.route;

      const targetPath = route === "/" ? `${basePath}/` : `${basePath}${route}`;

      if (window.location.pathname === targetPath) {
        return;
      }

      history.pushState({}, "", targetPath);

      renderRoute(route);
    });
  });

  window.addEventListener("popstate", () => {
    renderRoute(getRoutePath());
  });

  renderRoute(getRoutePath());
}
