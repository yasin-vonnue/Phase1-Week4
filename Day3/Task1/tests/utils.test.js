import { describe, expect, it } from "vitest";

import {
  chunk,
  zip,
  groupBy,
  pipe,
  compose,
  curry,
  partial,
} from "../script.js";

describe("chunk()", () => {
  it("should split an array into chunks of the requested size", () => {
    const result = chunk([1, 2, 3, 4, 5, 6], 2);

    expect(result).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  it("should handle an array whose length is not divisible by the chunk size", () => {
    const result = chunk([1, 2, 3, 4, 5], 2);

    expect(result).toEqual([[1, 2], [3, 4], [5]]);

    expect(result).toHaveLength(3);
  });

  it("should return an empty array when given an empty array", () => {
    const result = chunk([], 3);

    expect(result).toEqual([]);
    expect(result).toBeTruthy();
  });
});

describe("zip()", () => {
  it("should combine values from multiple arrays by index", () => {
    const result = zip(["A", "B", "C"], [1, 2, 3], ["x", "y", "z"]);

    expect(result).toEqual([
      ["A", 1, "x"],
      ["B", 2, "y"],
      ["C", 3, "z"],
    ]);
  });

  it("should handle arrays with different lengths", () => {
    const result = zip(["A", "B", "C"], [1, 2]);

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      ["A", 1],
      ["B", 2],
      ["C", undefined],
    ]);
  });

  it("should return an empty array when no arrays are provided", () => {
    const result = zip();

    expect(result).toEqual([]);
    expect(result).toBeTruthy();
  });
});

describe("groupBy()", () => {
  it("should group objects using the value returned by the key function", () => {
    const people = [
      { name: "John", age: 22 },
      { name: "Arthur", age: 30 },
      { name: "Charlie", age: 22 },
    ];

    const result = groupBy(people, (person) => person.age);

    expect(result).toEqual({
      22: [
        { name: "John", age: 22 },
        { name: "Charlie", age: 22 },
      ],
      30: [{ name: "Arthur", age: 30 }],
    });
  });

  it("should return an empty object for an empty array", () => {
    const result = groupBy([], (item) => item.category);

    expect(result).toEqual({});
    expect(Object.keys(result)).toHaveLength(0);
  });

  it("should support grouping primitive values", () => {
    const result = groupBy(["apple", "ant", "banana"], (word) => word[0]);

    expect(result).toBeTruthy();
    expect(result.a).toContain("apple");
    expect(result.a).toContain("ant");
    expect(result.b).toContain("banana");
  });
});

describe("pipe()", () => {
  it("should execute functions from left to right", () => {
    const double = (value) => value * 2;
    const addOne = (value) => value + 1;

    const result = pipe(double, addOne)(5);

    expect(result).toBe(11);
  });

  it("should support multiple functions in the pipeline", () => {
    const double = (value) => value * 2;
    const addOne = (value) => value + 1;
    const square = (value) => value ** 2;

    const result = pipe(double, addOne, square)(5);

    expect(result).toBe(121);
  });

  it("should return the initial value when no functions are provided", () => {
    const result = pipe()(42);

    expect(result).toBe(42);
  });
});

describe("compose()", () => {
  it("should execute functions from right to left", () => {
    const double = (value) => value * 2;
    const addOne = (value) => value + 1;

    const result = compose(double, addOne)(5);

    expect(result).toBe(12);
  });

  it("should support multiple functions in reverse order", () => {
    const double = (value) => value * 2;
    const addOne = (value) => value + 1;
    const square = (value) => value ** 2;

    const result = compose(square, addOne, double)(5);

    expect(result).toBe(121);
  });

  it("should return the initial value when no functions are provided", () => {
    const result = compose()(42);

    expect(result).toBe(42);
  });
});

describe("curry()", () => {
  it("should curry a multi-argument function one argument at a time", () => {
    const addThree = (a, b, c) => a + b + c;

    const curriedAdd = curry(addThree);

    const result = curriedAdd(1)(2)(3);

    expect(result).toBe(6);
  });

  it("should support providing multiple arguments at once", () => {
    const multiplyThree = (a, b, c) => a * b * c;

    const curriedMultiply = curry(multiplyThree);

    const result = curriedMultiply(2, 3)(4);

    expect(result).toBe(24);
    expect(result).toBeCloseTo(24);
  });

  it("should return a function while waiting for all arguments", () => {
    const addThree = (a, b, c) => a + b + c;

    const curriedAdd = curry(addThree);

    const partiallyApplied = curriedAdd(1);

    expect(typeof partiallyApplied === "function").toBeTruthy();
    expect(partiallyApplied === 0).toBeFalsy();
  });

  it("should throw when the original function is not callable", () => {
    const invalidCurry = curry(null);
    expect(() => invalidCurry()).toThrow();
  });
});

describe("partial()", () => {
  it("should preset arguments before the remaining arguments", () => {
    const add = (a, b, c) => a + b + c;

    const addTen = partial(add, 10);

    const result = addTen(20, 30);

    expect(result).toBe(60);
  });

  it("should support presetting multiple arguments", () => {
    const multiply = (a, b, c) => a * b * c;

    const multiplyBySix = partial(multiply, 2, 3);

    const result = multiplyBySix(4);

    expect(result).toBe(24);
    expect(result).toBeCloseTo(24);
  });

  it("should throw when the original function is not callable", () => {
    const invalidPartial = partial(null, 10);

    expect(() => invalidPartial(20)).toThrow();
  });
});
