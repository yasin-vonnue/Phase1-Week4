export function initClipboard() {
  const codeBlocks = document.querySelectorAll("pre code");
  const copyButtons = document.querySelectorAll(".copy-code");

  if (!codeBlocks.length || !copyButtons.length) {
    return;
  }

  copyButtons.forEach((button, index) => {
    const codeBlock = codeBlocks[index];

    if (!codeBlock) {
      return;
    }

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(codeBlock.textContent.trim());

        const status = button.closest("section")?.querySelector(".copy-status");

        if (status) {
          status.textContent = "Code copied to clipboard.";
        }

        button.textContent = "Copied!";

        setTimeout(() => {
          button.textContent = "Copy Code";

          if (status) {
            status.textContent = "";
          }
        }, 2000);
      } catch (error) {
        console.error("Clipboard copy failed:", error);

        const status = button.closest("section")?.querySelector(".copy-status");

        if (status) {
          status.textContent = "Unable to copy code.";
        }
      }
    });
  });
}
