import { beforeEach, describe, expect, it } from "vitest";
import { FormValidator } from "../js/formValidator.js";

describe("FormValidator", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="contact-form">
        <input id="name" name="name" />
        <span id="name-error"></span>

        <button type="submit">Submit</button>
      </form>
    `;
  });

  it("should show an error when a required field is empty", () => {
    const form = document.querySelector("#contact-form");

    const validator = new FormValidator(form, {
      name: [
        {
          type: "required",
          message: "Name is required.",
        },
      ],
    });

    const name = form.elements.name;

    validator.validateField("name");

    expect(name.classList.contains("is-invalid")).toBe(true);
    expect(name.getAttribute("aria-invalid")).toBe("true");
    expect(document.querySelector("#name-error").textContent).toBe(
      "Name is required.",
    );
  });

  it("should remove the error when the field becomes valid", () => {
    const form = document.querySelector("#contact-form");

    const validator = new FormValidator(form, {
      name: [
        {
          type: "required",
          message: "Name is required.",
        },
      ],
    });

    const name = form.elements.name;

    validator.validateField("name");

    expect(document.querySelector("#name-error").textContent).toBe(
      "Name is required.",
    );

    name.value = "Arthur";

    validator.validateField("name");

    expect(name.classList.contains("is-valid")).toBe(true);
    expect(name.classList.contains("is-invalid")).toBe(false);
    expect(name.getAttribute("aria-invalid")).toBe("false");
    expect(document.querySelector("#name-error").textContent).toBe("");
  });
});
