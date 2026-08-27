self.onmessage = (event) => {
  const data = event.data;

  const startTime = performance.now();

  data.sort((a, b) => a.value - b.value);

  const duration = performance.now() - startTime;

  self.postMessage({
    data,
    duration,
  });
};
