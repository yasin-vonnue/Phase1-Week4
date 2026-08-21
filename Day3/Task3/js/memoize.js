export function memoize(fn) {
  const cache = new Map();

  return (value) => {
    if (cache.has(value)) {
      return cache.get(value);
    }

    const result = fn(value);
    cache.set(value, result);

    return result;
  };
}
