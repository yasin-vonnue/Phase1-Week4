// chunk(arr, size)

export function chunk(arr, size) {
  const result = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}

// zip(...arrays)

export function zip(...arrays) {
  const maxLength = Math.max(...arrays.map((a) => a.length));

  return Array.from({ length: maxLength }, (_, i) =>
    arrays.map((arr) => arr[i]),
  );
}

export function groupBy(arr, keyFn) {
  return arr.reduce((groups, item) => {
    const key = keyFn(item);

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);
    return groups;
  }, {});
}

// 1. pipe - left to right

export const pipe = (...functions) => {
  return (initialValue) => {
    return functions.reduce((value, fn) => fn(value), initialValue);
  };
};

// 2. compose - right to left
export const compose = (...functions) => {
  return (initialValue) => {
    return functions.reduceRight((value, fn) => fn(value), initialValue);
  };
};

// 3. curry - converts multi-argument function into unary chain
export const curry = (fn) => {
  const curried = (...args) => {
    if (args.length >= fn.length) {
      return fn(...args);
    }

    return (...nextArgs) => curried(...args, ...nextArgs);
  };

  return curried;
};

// 4. partial - presets some arguments
export const partial = (fn, ...presetArgs) => {
  return (...remainingArgs) => {
    return fn(...presetArgs, ...remainingArgs);
  };
};
