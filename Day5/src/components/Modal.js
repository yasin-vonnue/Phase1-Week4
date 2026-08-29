export function Modal({ title, content }) {
  const overlay = document.createElement("div");
  overlay.className = "modal";

  const dialog = document.createElement("div");
  dialog.className = "modal_dialog";

  const heading = document.createElement("h2");
  heading.textContent = title;

  const paragraph = document.createElement("p");
  paragraph.textContent = content;

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.textContent = "Close";

  dialog.append(heading, paragraph, closeButton);

  overlay.append(dialog);

  return overlay;
}
