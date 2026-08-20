import { describe, expect, it, vi } from "vitest";

import { EventEmitter } from "../js/eventEmitter.js";

describe("EventEmitter", () => {
  it("should call each listener with the correct arguments", () => {
    const listenerOne = vi.fn();
    const listenerTwo = vi.fn();

    const emitter = new EventEmitter();

    emitter.on("message", listenerOne);
    emitter.on("message", listenerTwo);

    emitter.emit("message", "Hello", 42);

    expect(listenerOne).toHaveBeenCalledWith("Hello", 42);
  });
});
