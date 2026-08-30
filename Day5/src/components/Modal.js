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

  function closeModal() {
    overlay.remove();
    document.removeEventListener("keydown", handleKeyDown);
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  closeButton.addEventListener("click", closeModal);

  document.addEventListener("keydown", handleKeyDown);

  dialog.append(heading, paragraph, closeButton);

  overlay.append(dialog);

  return overlay;
}
