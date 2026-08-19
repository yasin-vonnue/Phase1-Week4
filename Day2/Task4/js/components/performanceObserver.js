export function initPerformanceObserver() {
  if (!("PerformanceObserver" in window)) {
    console.warn("PerformanceObserver is not supported.");

    return;
  }

  try {
    const lcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log("LCP:", `${entry.startTime.toFixed(2)} ms`, entry);
      }
    });

    lcpObserver.observe({
      type: "largest-contentful-paint",
      buffered: true,
    });
  } catch (error) {
    console.warn("LCP observation is not supported:", error);
  }

  try {
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          console.log("CLS:", entry.value, entry);
        }
      }
    });

    clsObserver.observe({
      type: "layout-shift",
      buffered: true,
    });
  } catch (error) {
    console.warn("CLS observation is not supported:", error);
  }
}
