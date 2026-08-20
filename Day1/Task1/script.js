// Functional Programming Utitlities

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

// Tests

const double = (n) => n * 2;
const addOne = (n) => n + 1;
const square = (n) => n ** 2;

console.log("PIPE");

console.log(pipe(double, addOne)(5));

console.log(pipe(addOne, double)(5));

console.log(pipe(double, addOne, square)(5));

console.log("COMPOSE");

console.log(compose(addOne, double)(5));

console.log(compose(double, addOne)(5));

console.log(compose(square, addOne, double)(5));

console.log("CURRY");

const addThree = (a, b, c) => a + b + c;
const multiplyThree = (a, b, c) => a * b * c;
const createFullName = (first, middle, last) => `${first} ${middle} ${last}`;

console.log(curry(addThree)(1)(2)(3));

console.log(curry(multiplyThree)(2)(3)(4));

console.log(curry(createFullName)("Arthur")("Morgan")("Lee"));

console.log("PARTIAL");

const add = (a, b, c) => a + b + c;
const multiply = (a, b, c) => a * b * c;
const greet = (greeting, name) => `${greeting}, ${name}!`;

const addTen = partial(add, 10);

console.log(addTen(20, 30));

const multiplyByTwo = partial(multiply, 2);

console.log(multiplyByTwo(3, 4));

const sayHello = partial(greet, "Hello");

console.log(sayHello("Arthur"));
