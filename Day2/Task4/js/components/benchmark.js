export function initBenchmark() {
  const button = document.querySelector("#run-benchmark");
  const status = document.querySelector("#benchmark-status");
  const normalList = document.querySelector("#normal-list");
  const virtualList = document.querySelector("#virtual-list");

  if (!button || !status || !normalList || !virtualList) {
    return;
  }

  const totalItems = 1000;
  const itemHeight = 30;
  const buffer = 10;

  function createItem(index) {
    const item = document.createElement("div");

    item.className = "benchmark-item";
    item.textContent = `Item ${index + 1}`;

    return item;
  }

  function renderNormalList() {
    normalList.innerHTML = "";

    for (let index = 0; index < totalItems; index += 1) {
      normalList.append(createItem(index));
    }
  }

  function renderVirtualList() {
    virtualList.innerHTML = "";

    const spacer = document.createElement("div");

    spacer.className = "virtual-spacer";
    spacer.style.height = `${totalItems * itemHeight}px`;

    const visible = document.createElement("div");

    visible.className = "virtual-visible";

    virtualList.append(spacer);
    spacer.append(visible);

    function renderVisibleItems() {
      const scrollTop = virtualList.scrollTop;
      const containerHeight = virtualList.clientHeight;

      const startIndex = Math.max(
        0,
        Math.floor(scrollTop / itemHeight) - buffer,
      );

      const visibleCount = Math.ceil(containerHeight / itemHeight) + buffer * 2;

      const endIndex = Math.min(totalItems, startIndex + visibleCount);

      visible.innerHTML = "";

      visible.style.transform = `translateY(${startIndex * itemHeight}px)`;

      for (let index = startIndex; index < endIndex; index += 1) {
        visible.append(createItem(index));
      }
    }

    virtualList.addEventListener("scroll", renderVisibleItems);

    renderVisibleItems();
  }

  button.addEventListener("click", () => {
    normalList.innerHTML = "";
    virtualList.innerHTML = "";

    const normalStart = performance.now();

    renderNormalList();

    const normalEnd = performance.now();

    const normalDuration = normalEnd - normalStart;

    const virtualStart = performance.now();

    renderVirtualList();

    const virtualEnd = performance.now();

    const virtualDuration = virtualEnd - virtualStart;

    status.textContent =
      `Normal DOM: ${normalDuration.toFixed(2)} ms | ` +
      `Virtual Scroll: ${virtualDuration.toFixed(2)} ms`;

    console.log("Performance benchmark:", {
      normalDOM: `${normalDuration.toFixed(2)} ms`,
      virtualScroll: `${virtualDuration.toFixed(2)} ms`,
    });
  });
}
