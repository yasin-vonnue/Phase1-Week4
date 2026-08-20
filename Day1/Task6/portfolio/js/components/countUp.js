export function initCountUp() {
  const counters = document.querySelectorAll("[data-count-target]");

  if (!counters.length) {
    return;
  }

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.countTarget);
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentValue = Math.floor(target * progress);

      counter.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  };

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    },
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}
