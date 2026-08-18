export function initShare() {
  const shareButton = document.querySelector("#share-button");
  const shareStatus = document.querySelector("#share-status");

  if (!shareButton || !shareStatus) {
    return;
  }

  shareButton.addEventListener("click", async () => {
    const shareData = {
      title: document.title,
      text: "Check out this browser APIs demonstration.",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);

        shareStatus.textContent = "Page shared successfully.";
      } catch (error) {
        if (error.name === "AbortError") {
          shareStatus.textContent = "Share cancelled.";
          return;
        }

        console.error("Share failed:", error);

        shareStatus.textContent = "Unable to share this page.";
      }

      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);

      shareStatus.textContent =
        "Sharing is not supported. URL copied to clipboard.";
    } catch (error) {
      console.error("Failed to copy URL:", error);

      shareStatus.textContent = "Unable to share or copy the page URL.";
    }
  });
}
