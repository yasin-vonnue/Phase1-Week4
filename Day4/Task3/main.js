const scrollContainer = document.querySelector("#virtual-scroll");

const scrollContent = document.querySelector("#scroll-content");

const renderInfo = document.querySelector("#render-info");

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`);

const itemHeight = 50;
const buffer = 5;

let animationFrameId = null;

scrollContent.style.height = `${items.length * itemHeight}px`;

function render() {
  const scrollTop = scrollContainer.scrollTop;

  const visibleStart = Math.floor(scrollTop / itemHeight);

  const visibleCount = Math.ceil(scrollContainer.clientHeight / itemHeight);

  const start = Math.max(0, visibleStart - buffer);

  const end = Math.min(items.length, visibleStart + visibleCount + buffer);

  scrollContent.replaceChildren();

  const fragment = document.createDocumentFragment();

  for (let index = start; index < end; index += 1) {
    const item = document.createElement("div");

    item.className = "virtual-item";
    item.textContent = items[index];

    fragment.append(item);
  }

  scrollContent.append(fragment);

  scrollContent.style.transform = `translateY(${start * itemHeight}px)`;

  renderInfo.textContent =
    `Showing items ${start + 1}-${end} of ${items.length} | ` +
    `DOM elements: ${end - start}`;
}

function handleScroll() {
  if (animationFrameId !== null) {
    return;
  }

  animationFrameId = requestAnimationFrame(() => {
    render();

    animationFrameId = null;
  });
}

scrollContainer.addEventListener("scroll", handleScroll);

render();
