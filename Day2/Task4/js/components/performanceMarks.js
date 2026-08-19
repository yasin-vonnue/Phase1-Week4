export function initPerformanceMarks() {
  performance.mark("portfolio-init-start");

  init();

  performance.mark("portfolio-init-end");

  performance.measure(
    "portfolio-init",
    "portfolio-init-start",
    "portfolio-init-end",
  );

  const measurement = performance.getEntriesByName("portfolio-init")[0];

  const output = document.querySelector("#init-performance");

  if (output && measurement) {
    output.textContent = `Portfolio init completed in ${measurement.duration.toFixed(2)} ms`;
  }

  console.log("Portfolio init:", `${measurement.duration.toFixed(2)} ms`);
}

function init() {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    section.dataset.initialized = "true";
  });

  document.body.dataset.portfolioInitialized = "true";
}
