if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("./sw.js");

      console.log("Service Worker registered:", registration.scope);
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  });
}

let deferredPrompt = null;

const installButton = document.querySelector("#install-button");

const installStatus = document.querySelector("#install-status");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();

  deferredPrompt = event;

  installButton.hidden = false;

  installStatus.textContent = "This app can be installed.";

  console.log("beforeinstallprompt fired.");
});

installButton?.addEventListener("click", async () => {
  if (!deferredPrompt) {
    return;
  }

  deferredPrompt.prompt();

  const { outcome } = await deferredPrompt.userChoice;

  console.log("Installation result:", outcome);

  if (outcome === "accepted") {
    installStatus.textContent = "App installation accepted.";
  } else {
    installStatus.textContent = "App installation dismissed.";
  }

  deferredPrompt = null;

  installButton.hidden = true;
});

window.addEventListener("appinstalled", () => {
  console.log("PWA installed successfully.");

  installStatus.textContent = "App installed successfully.";

  installButton.hidden = true;
});
