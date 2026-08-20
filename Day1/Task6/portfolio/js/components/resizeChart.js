export function initResizeChart() {
  const chart = document.querySelector("[data-resize-chart]");

  if (!chart) {
    return;
  }

  const values = [500, 150, 50, 10];

  const chartVisual = document.createElement("div");

  chartVisual.className = "resize-chart-visual";
  chartVisual.setAttribute("aria-label", "Responsive statistics chart");

  chart.append(chartVisual);

  const drawChart = (width) => {
    chartVisual.replaceChildren();

    const maxValue = Math.max(...values);

    values.forEach((value) => {
      const bar = document.createElement("div");

      bar.className = "resize-chart-bar";

      const height = (value / maxValue) * 100;
      const barWidth = Math.max(20, Math.floor(width / 12));

      bar.style.height = `${height}%`;
      bar.style.width = `${barWidth}px`;

      bar.setAttribute("aria-label", `Value ${value}`);

      chartVisual.append(bar);
    });

    console.log(`Chart redrawn at ${Math.round(width)}px`);
  };

  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      drawChart(entry.contentRect.width);
    });
  });

  resizeObserver.observe(chart);
}
