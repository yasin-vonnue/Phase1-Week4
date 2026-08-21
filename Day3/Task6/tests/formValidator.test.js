import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  FormValidator,
  setupContactFormValidation,
} from "../js/formValidator.js";

describe("FormValidator", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="contact-form">
        <input id="name" name="name" />
        <input id="email" name="email" />
        <span id="name-error"></span>
        <span id="email-error"></span>
        <button type="submit">Submit</button>
      </form>
    `;
  });

  it("should validate required, minLength, pattern and email rules", () => {
    const form = document.querySelector("#contact-form");

    const validator = new FormValidator(form, {
      name: [
        { type: "required", message: "Name required" },
        { type: "minLength", value: 3, message: "Too short" },
      ],
      email: [{ type: "email", message: "Invalid email" }],
    });

    const name = form.elements.name;
    const email = form.elements.email;

    expect(validator.validateField("name")).toBe(false);

    name.value = "Al";
    expect(validator.validateField("name")).toBe(false);

    name.value = "Alex";
    expect(validator.validateField("name")).toBe(true);

    email.value = "invalid";
    expect(validator.validateField("email")).toBe(false);

    email.value = "alex@test.com";
    expect(validator.validateField("email")).toBe(true);
  });

  it("should validate fields on blur and input", () => {
    const form = document.querySelector("#contact-form");

    const validator = new FormValidator(form, {
      name: [{ type: "required", message: "Required" }],
    });

    const name = form.elements.name;

    name.dispatchEvent(new Event("blur"));
    expect(name.classList.contains("is-invalid")).toBe(true);

    name.value = "Alex";
    name.dispatchEvent(new Event("input"));

    expect(name.classList.contains("is-valid")).toBe(true);
  });

  it("should validate the whole form", () => {
    const form = document.querySelector("#contact-form");

    const validator = new FormValidator(form, {
      name: [{ type: "required" }],
      email: [{ type: "required" }],
    });

    expect(validator.validateForm()).toBe(false);

    form.elements.name.value = "Alex";
    form.elements.email.value = "alex@test.com";

    expect(validator.validateForm()).toBe(true);
  });

  it("should handle missing fields and error elements", () => {
    const form = document.querySelector("#contact-form");

    const validator = new FormValidator(form, {
      missing: [{ type: "required" }],
    });

    expect(validator.validateField("missing")).toBe(true);

    const field = form.elements.name;
    const secondValidator = new FormValidator(form, {
      name: [{ type: "required" }],
    });

    field.remove();
    expect(secondValidator.validateField("name")).toBe(true);
  });

  it("should not submit an invalid form", async () => {
    const form = document.querySelector("#contact-form");

    new FormValidator(form, {
      name: [{ type: "required" }],
    });

    form.dispatchEvent(new Event("submit"));

    expect(form.elements.name.classList.contains("is-invalid")).toBe(true);
  });

  it("should validate a pattern rule", () => {
    const form = document.querySelector("#contact-form");

    const validator = new FormValidator(form, {
      name: [
        {
          type: "pattern",
          value: /^[A-Z][a-z]+$/,
          message: "Invalid name",
        },
      ],
    });

    const name = form.elements.name;

    name.value = "123";
    expect(validator.validateField("name")).toBe(false);

    name.value = "Arthur";
    expect(validator.validateField("name")).toBe(true);
  });

  it("should submit a valid form", async () => {
    vi.useFakeTimers();

    const form = document.querySelector("#contact-form");
    form.elements.name.value = "Alex";

    new FormValidator(form, {
      name: [{ type: "required" }],
    });

    form.dispatchEvent(new Event("submit"));

    await vi.advanceTimersByTimeAsync(1500);

    expect(form.elements.name.value).toBe("");

    vi.useRealTimers();
  });

  it("should setup the contact form", () => {
    expect(() => setupContactFormValidation()).not.toThrow();
  });
});
