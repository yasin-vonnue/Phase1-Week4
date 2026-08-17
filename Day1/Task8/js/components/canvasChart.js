export function initCanvasChart() {
  const canvas = document.querySelector("[data-canvas-chart]");
  const tooltip = document.querySelector("#chart-tooltip");

  if (!canvas || !tooltip) {
    return;
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  const salesData = [
    { month: "Jan", value: 120 },
    { month: "Feb", value: 180 },
    { month: "Mar", value: 150 },
    { month: "Apr", value: 220 },
    { month: "May", value: 260 },
    { month: "Jun", value: 240 },
    { month: "Jul", value: 300 },
    { month: "Aug", value: 280 },
    { month: "Sep", value: 340 },
    { month: "Oct", value: 380 },
    { month: "Nov", value: 360 },
    { month: "Dec", value: 420 },
  ];

  const padding = {
    top: 50,
    right: 40,
    bottom: 70,
    left: 70,
  };

  const chartWidth = canvas.width - padding.left - padding.right;

  const chartHeight = canvas.height - padding.top - padding.bottom;

  const maxValue = 500;

  const barGap = 20;

  const barWidth =
    (chartWidth - barGap * (salesData.length - 1)) / salesData.length;

  const bars = [];

  function drawChart(progress) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "14px Arial";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    for (let value = 0; value <= maxValue; value += 100) {
      const y = padding.top + chartHeight - (value / maxValue) * chartHeight;

      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(canvas.width - padding.right, y);

      ctx.strokeStyle = "#dddddd";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#555555";
      ctx.fillText(value, padding.left - 10, y);
    }

    ctx.beginPath();

    ctx.moveTo(padding.left, padding.top);

    ctx.lineTo(padding.left, canvas.height - padding.bottom);

    ctx.lineTo(canvas.width - padding.right, canvas.height - padding.bottom);

    ctx.strokeStyle = "#222222";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#222222";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    ctx.fillText("Month", padding.left + chartWidth / 2, canvas.height - 35);

    ctx.save();

    ctx.translate(20, padding.top + chartHeight / 2);

    ctx.rotate(-Math.PI / 2);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText("Sales", 0, 0);

    ctx.restore();

    bars.length = 0;

    salesData.forEach((item, index) => {
      const animatedValue = item.value * progress;

      const barHeight = (animatedValue / maxValue) * chartHeight;

      const x = padding.left + index * (barWidth + barGap);

      const y = canvas.height - padding.bottom - barHeight;

      const gradient = ctx.createLinearGradient(
        0,
        y,
        0,
        canvas.height - padding.bottom,
      );

      gradient.addColorStop(0, "#e63946");
      gradient.addColorStop(1, "#457b9d");

      ctx.fillStyle = gradient;

      ctx.fillRect(x, y, barWidth, barHeight);

      bars.push({
        x,
        y,
        width: barWidth,
        height: barHeight,
        month: item.month,
        value: item.value,
      });

      ctx.fillStyle = "#222222";
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      ctx.fillText(
        item.month,
        x + barWidth / 2,
        canvas.height - padding.bottom + 12,
      );
    });
  }

  function easeOutCubic(progress) {
    return 1 - Math.pow(1 - progress, 3);
  }

  const animationDuration = 2000;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;

    const rawProgress = Math.min(elapsed / animationDuration, 1);

    const progress = easeOutCubic(rawProgress);

    drawChart(progress);

    if (rawProgress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);

  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (event.clientX - rect.left) * scaleX;

    const mouseY = (event.clientY - rect.top) * scaleY;

    const hoveredBar = bars.find(
      (bar) =>
        mouseX >= bar.x &&
        mouseX <= bar.x + bar.width &&
        mouseY >= bar.y &&
        mouseY <= bar.y + bar.height,
    );

    if (!hoveredBar) {
      tooltip.hidden = true;
      return;
    }

    tooltip.textContent = `${hoveredBar.month}: ${hoveredBar.value}`;

    tooltip.hidden = false;

    tooltip.style.left = `${event.clientX - rect.left + 10}px`;

    tooltip.style.top = `${event.clientY - rect.top + 10}px`;
  });

  canvas.addEventListener("mouseleave", () => {
    tooltip.hidden = true;
  });

  canvas.addEventListener("mouseleave", () => {
    tooltip.hidden = true;
  });

  const exportButton = document.querySelector("#export-chart");

  if (!exportButton) {
    return;
  }

  exportButton.addEventListener("click", () => {
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.download = "sales-chart.png";
    link.href = image;

    link.click();
  });
}
