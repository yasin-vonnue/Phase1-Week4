export function initAnimationComparison() {
  const layoutBox = document.querySelector("#left-box");

  const transformBox = document.querySelector("#transform-box");

  const layoutButton = document.querySelector("#layout-button");

  const transformButton = document.querySelector("#transform-button");

  if (!layoutBox || !transformBox || !layoutButton || !transformButton) {
    return;
  }

  function animateLayout() {
    const startTime = performance.now();
    const duration = 1500;
    const startPosition = 20;
    const endPosition = 500;

    function update(currentTime) {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      const position = startPosition + (endPosition - startPosition) * progress;

      layoutBox.style.left = `${position}px`;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  function animateTransform() {
    const startTime = performance.now();
    const duration = 1500;
    const startPosition = 0;
    const endPosition = 480;

    function update(currentTime) {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      const position = startPosition + (endPosition - startPosition) * progress;

      transformBox.style.transform = `translateX(${position}px)`;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  layoutButton.addEventListener("click", animateLayout);

  transformButton.addEventListener("click", animateTransform);
}
