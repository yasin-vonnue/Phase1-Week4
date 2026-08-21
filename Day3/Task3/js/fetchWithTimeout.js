export function fetchWithTimeout(url, timeout) {
  const controller = new AbortController();

  const timerId = setTimeout(() => {
    controller.abort();
  }, timeout);

  const request = fetch(url, {
    signal: controller.signal,
  });

  return request.finally(() => {
    clearTimeout(timerId);
  });
}
