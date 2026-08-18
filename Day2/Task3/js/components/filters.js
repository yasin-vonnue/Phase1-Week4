export function initFilters() {
  const filter = document.querySelector("#category-filter");
  const status = document.querySelector("#filter-status");

  if (!filter || !status) {
    return;
  }

  const params = new URLSearchParams(window.location.search);

  const storedCategory = params.get("category");

  if (
    storedCategory &&
    [...filter.options].some((option) => option.value === storedCategory)
  ) {
    filter.value = storedCategory;
  }

  updateFilterStatus();

  filter.addEventListener("change", () => {
    const currentParams = new URLSearchParams(window.location.search);

    if (filter.value === "all") {
      currentParams.delete("category");
    } else {
      currentParams.set("category", filter.value);
    }

    const queryString = currentParams.toString();

    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    history.pushState({}, "", newUrl);

    updateFilterStatus();
  });

  function updateFilterStatus() {
    status.textContent = `Current category: ${filter.value}`;
  }
}
