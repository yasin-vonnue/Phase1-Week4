export function initVirtualScroll() {
  const container = document.querySelector("[data-virtual-scroll]");

  if (!container) {
    return;
  }

  const itemCount = 10000;
  const itemHeight = 50;
  const buffer = 10;

  const items = Array.from(
    { length: itemCount },
    (_, index) => `Item ${index + 1}`,
  );

  const viewport = container.querySelector(".virtual-scroll-viewport");
  const content = container.querySelector(".virtual-scroll-content");

  if (!viewport || !content) {
    return;
  }

  content.style.height = `${itemCount * itemHeight}px`;

  function render() {
    const scrollTop = viewport.scrollTop;
    const containerHeight = viewport.clientHeight;

    const firstVisibleIndex = Math.floor(scrollTop / itemHeight);
    const visibleItemCount = Math.ceil(containerHeight / itemHeight);

    const startIndex = Math.max(0, firstVisibleIndex - buffer);
    const endIndex = Math.min(
      itemCount,
      firstVisibleIndex + visibleItemCount + buffer,
    );

    const visibleItems = items.slice(startIndex, endIndex);

    content.innerHTML = "";

    const visibleContainer = document.createElement("div");

    visibleContainer.className = "virtual-scroll-visible";
    visibleContainer.style.transform = `translateY(${startIndex * itemHeight}px)`;

    visibleItems.forEach((item) => {
      const element = document.createElement("div");

      element.className = "virtual-scroll-item";
      element.style.height = `${itemHeight}px`;
      element.textContent = item;

      visibleContainer.append(element);
    });

    content.append(visibleContainer);
  }

  viewport.addEventListener("scroll", render);

  render();
}
