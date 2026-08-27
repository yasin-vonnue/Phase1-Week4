const canvas = document.querySelector("#sales-chart");
const context = canvas.getContext("2d");

const tooltip = document.querySelector("#tooltip");
const exportButton = document.querySelector("#export-chart");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const values = [420, 560, 480, 720, 650, 810, 760, 900, 840, 980, 920, 1100];

const averageTarget =
  values.reduce((sum, value) => sum + value, 0) / values.length;

const chart = {
  left: 80,
  right: 30,
  top: 40,
  bottom: 70,
};

const chartWidth = canvas.width - chart.left - chart.right;

const chartHeight = canvas.height - chart.top - chart.bottom;

const maxValue = 1200;

let animationProgress = 0;
let animationFrameId = null;
let hoveredIndex = -1;

function drawAxes() {
  context.save();

  context.strokeStyle = "#ccc";
  context.lineWidth = 1;

  const gridLines = 6;

  for (let i = 0; i <= gridLines; i += 1) {
    const value = (maxValue / gridLines) * i;

    const y = canvas.height - chart.bottom - (value / maxValue) * chartHeight;

    context.beginPath();
    context.moveTo(chart.left, y);
    context.lineTo(canvas.width - chart.right, y);
    context.stroke();

    context.fillStyle = "#555";
    context.font = "13px Arial";
    context.textAlign = "right";

    context.fillText(value, chart.left - 10, y + 4);
  }

  context.strokeStyle = "#333";
  context.lineWidth = 2;

  context.beginPath();

  context.moveTo(chart.left, chart.top);

  context.lineTo(chart.left, canvas.height - chart.bottom);

  context.lineTo(canvas.width - chart.right, canvas.height - chart.bottom);

  context.stroke();

  context.restore();
}

function drawMonthLabels() {
  const slotWidth = chartWidth / months.length;

  context.save();

  context.fillStyle = "#333";
  context.font = "13px Arial";
  context.textAlign = "center";

  months.forEach((month, index) => {
    const x = chart.left + slotWidth * index + slotWidth / 2;

    const y = canvas.height - chart.bottom + 25;

    context.fillText(month, x, y);
  });

  context.restore();
}

function drawBars(progress) {
  const slotWidth = chartWidth / months.length;

  const barWidth = slotWidth * 0.6;

  values.forEach((value, index) => {
    const x = chart.left + slotWidth * index + (slotWidth - barWidth) / 2;

    const fullHeight = (value / maxValue) * chartHeight;

    const barHeight = fullHeight * progress;

    const y = canvas.height - chart.bottom - barHeight;

    const gradient = context.createLinearGradient(
      0,
      y,
      0,
      canvas.height - chart.bottom,
    );

    gradient.addColorStop(0, "#2563eb");
    gradient.addColorStop(1, "#93c5fd");

    context.fillStyle = gradient;

    if (index === hoveredIndex) {
      context.globalAlpha = 0.7;
    }

    context.fillRect(x, y, barWidth, barHeight);

    context.globalAlpha = 1;
  });
}

function drawAverageLine() {
  const y =
    canvas.height - chart.bottom - (averageTarget / maxValue) * chartHeight;

  context.save();

  context.strokeStyle = "#dc2626";
  context.lineWidth = 2;
  context.setLineDash([8, 6]);

  context.beginPath();

  context.moveTo(chart.left, y);

  context.lineTo(canvas.width - chart.right, y);

  context.stroke();

  context.setLineDash([]);

  context.fillStyle = "#dc2626";
  context.font = "13px Arial";
  context.textAlign = "right";

  context.fillText(
    `Average: ${Math.round(averageTarget)}`,
    canvas.width - chart.right,
    y - 8,
  );

  context.restore();
}

function easeOutCubic(progress) {
  return 1 - Math.pow(1 - progress, 3);
}

function drawChart() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawAxes();
  drawMonthLabels();

  const easedProgress = easeOutCubic(animationProgress);

  drawBars(easedProgress);
  drawAverageLine();
}

function animateChart(startTime) {
  const elapsed = performance.now() - startTime;

  animationProgress = Math.min(elapsed / 1200, 1);

  drawChart();

  if (animationProgress < 1) {
    animationFrameId = requestAnimationFrame(() => animateChart(startTime));
  }
}

function startAnimation() {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }

  animationProgress = 0;

  animationFrameId = requestAnimationFrame(() =>
    animateChart(performance.now()),
  );
}

startAnimation();

canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / rect.width;

  const mouseX = (event.clientX - rect.left) * scaleX;

  const mouseY = (event.clientY - rect.top) * (canvas.height / rect.height);

  const slotWidth = chartWidth / months.length;

  const index = Math.floor((mouseX - chart.left) / slotWidth);

  if (index < 0 || index >= values.length) {
    hoveredIndex = -1;
    tooltip.hidden = true;
    drawChart();
    return;
  }

  const barLeft = chart.left + slotWidth * index;

  const barRight = barLeft + slotWidth;

  const barTop =
    canvas.height - chart.bottom - (values[index] / maxValue) * chartHeight;

  if (
    mouseX >= barLeft &&
    mouseX <= barRight &&
    mouseY >= barTop &&
    mouseY <= canvas.height - chart.bottom
  ) {
    hoveredIndex = index;

    tooltip.hidden = false;

    tooltip.textContent = `${months[index]}: ${values[index]}`;

    tooltip.style.left = `${event.clientX - rect.left}px`;

    tooltip.style.top = `${barTop * (rect.height / canvas.height)}px`;
  } else {
    hoveredIndex = -1;
    tooltip.hidden = true;
  }

  drawChart();
});

canvas.addEventListener("mouseleave", () => {
  hoveredIndex = -1;
  tooltip.hidden = true;
  drawChart();
});

exportButton.addEventListener("click", () => {
  const link = document.createElement("a");

  link.download = "monthly-sales-chart.png";

  link.href = canvas.toDataURL("image/png");

  link.click();
});
