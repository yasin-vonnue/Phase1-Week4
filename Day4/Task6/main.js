const workerButton = document.querySelector("#worker-sort");

const mainButton = document.querySelector("#main-sort");

const status = document.querySelector("#status");

const timer = document.querySelector("#timer");

const results = document.querySelector("#results");

const itemCount = 100000;

let data = [];

function generateData() {
  return Array.from({ length: itemCount }, (_, index) => ({
    id: index + 1,
    value: Math.floor(Math.random() * 1000000),
  }));
}

function displayResults(sortedData, duration) {
  const firstFive = sortedData.slice(0, 5);

  const lastFive = sortedData.slice(-5);

  results.textContent =
    `First 5:\n${JSON.stringify(firstFive, null, 2)}\n\n` +
    `Last 5:\n${JSON.stringify(lastFive, null, 2)}\n\n` +
    `Sort time: ${duration.toFixed(2)} ms`;
}

function startUITimer() {
  const start = performance.now();

  function update() {
    const elapsed = performance.now() - start;

    timer.textContent = `UI responsiveness timer: ${elapsed.toFixed(0)} ms`;

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const worker = new Worker("./worker.js");

worker.onmessage = (event) => {
  const { data: sortedData, duration } = event.data;

  status.textContent = "Worker sorting completed.";

  displayResults(sortedData, duration);
};

worker.onerror = (error) => {
  status.textContent = `Worker error: ${error.message}`;
};

workerButton.addEventListener("click", () => {
  data = generateData();

  status.textContent = "Sorting 100,000 objects in Web Worker...";

  results.textContent = "Waiting for worker result...";

  const startTime = performance.now();

  worker.postMessage(data);

  console.log("Data sent to worker:", data.length);

  console.log("Worker request started at:", startTime);
});

mainButton.addEventListener("click", () => {
  data = generateData();

  status.textContent = "Sorting 100,000 objects on main thread...";

  results.textContent = "Sorting...";

  const startTime = performance.now();

  data.sort((a, b) => a.value - b.value);

  const duration = performance.now() - startTime;

  status.textContent = "Main-thread sorting completed.";

  displayResults(data, duration);

  console.log("Main-thread sort:", duration.toFixed(2), "ms");
});

startUITimer();
