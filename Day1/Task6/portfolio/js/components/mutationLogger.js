export function initMutationLogger() {
  const overlay = document.createElement("div");

  overlay.className = "mutation-log-overlay";
  overlay.setAttribute("aria-live", "polite");
  overlay.setAttribute("aria-label", "DOM mutation log");

  document.body.append(overlay);

  const addLog = (message) => {
    const entry = document.createElement("div");

    entry.className = "mutation-log-entry";
    entry.textContent = `${new Date().toLocaleTimeString()} - ${message}`;

    overlay.prepend(entry);

    if (overlay.children.length > 20) {
      overlay.lastElementChild.remove();
    }
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.target.nodeType === Node.ELEMENT_NODE &&
        mutation.target.closest(".mutation-log-overlay")
      ) {
        return;
      }

      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            !node.closest(".mutation-log-overlay")
          ) {
            addLog(`Element added: <${node.tagName.toLowerCase()}>`);
          }
        });

        mutation.removedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            addLog(`Element removed: <${node.tagName.toLowerCase()}>`);
          }
        });
      }

      if (mutation.type === "attributes") {
        if (mutation.attributeName === "style") {
          return;
        }

        addLog(
          `Attribute changed: ${mutation.attributeName} on <${mutation.target.tagName.toLowerCase()}>`,
        );
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });
}
