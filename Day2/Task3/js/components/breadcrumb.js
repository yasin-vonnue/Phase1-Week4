export function initBreadcrumb() {
  const breadcrumb = document.querySelector("#breadcrumb");

  if (!breadcrumb) {
    return;
  }

  function updateBreadcrumb() {
    const pathname = window.location.pathname;

    const pathParts = pathname.split("/").filter(Boolean);

    const taskIndex = pathParts.findIndex((part) => part === "Task3");

    const routeParts = taskIndex !== -1 ? pathParts.slice(taskIndex + 1) : [];

    const currentRoute =
      routeParts.length > 0 ? routeParts[routeParts.length - 1] : "home";

    const labels = {
      home: "Home",
      products: "Products",
      about: "About",
    };

    breadcrumb.innerHTML = "";

    const list = document.createElement("ol");

    list.className = "breadcrumb-list";

    const homeItem = document.createElement("li");

    const homeLink = document.createElement("a");

    homeLink.href = `${window.location.origin}${
      window.location.pathname.split("/Task3")[0]
    }/Task3/`;

    homeLink.textContent = "Home";

    homeLink.addEventListener("click", (event) => {
      event.preventDefault();

      history.pushState({}, "", homeLink.href);

      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    homeItem.append(homeLink);
    list.append(homeItem);

    if (currentRoute !== "home") {
      const separator = document.createElement("li");

      separator.className = "breadcrumb-separator";

      separator.textContent = "›";

      separator.setAttribute("aria-hidden", "true");

      list.append(separator);

      const currentItem = document.createElement("li");

      currentItem.textContent = labels[currentRoute] || currentRoute;

      currentItem.setAttribute("aria-current", "page");

      list.append(currentItem);
    }

    breadcrumb.append(list);
  }

  window.addEventListener("popstate", updateBreadcrumb);

  document.querySelectorAll("[data-route]").forEach((link) => {
    link.addEventListener("click", updateBreadcrumb);
  });

  updateBreadcrumb();
}
