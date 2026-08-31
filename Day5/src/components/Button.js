export function Button({ text, type = "button", className = "" }) {
  const button = document.createElement("button");

  button.type = type;
  button.textContent = text;

  if (className) {
    button.className = className;
  }

  return button;
}
