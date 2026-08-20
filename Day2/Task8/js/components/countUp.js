export function initCountUp() {
  const countValue = document.querySelector("#count-value");

  const countButton = document.querySelector("#count-button");

  if (!countValue || !countButton) {
    return;
  }

  const targetValue = 1000;
  const duration = 2000;

  function easeOutCubic(progress) {
    return 1 - Math.pow(1 - progress, 3);
  }

  function animate(startTime) {
    return function update(currentTime) {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easeOutCubic(progress);
      const currentValue = Math.round(targetValue * easedProgress);

      countValue.textContent = currentValue.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        countButton.disabled = false;

        console.log("Count-up animation completed.");
      }
    };
  }

  countButton.addEventListener("click", () => {
    countButton.disabled = true;

    countValue.textContent = "0";

    const startTime = performance.now();

    requestAnimationFrame(animate(startTime));
  });
}
