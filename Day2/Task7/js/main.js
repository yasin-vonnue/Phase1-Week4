import { initKanban, syncPendingChanges } from "./components/kanban.js";

const connectionStatus = document.querySelector("#connection-status");

const syncStatus = document.querySelector("#sync-status");

function updateConnectionStatus() {
  if (navigator.onLine) {
    connectionStatus.textContent = "Online";
  } else {
    connectionStatus.textContent = "Offline";
  }
}

async function syncChanges() {
  syncStatus.textContent = "Syncing changes...";

  try {
    await syncPendingChanges();

    syncStatus.textContent = "Changes synced successfully.";
  } catch (error) {
    console.error("Sync failed:", error);

    syncStatus.textContent = "Sync failed. Changes remain locally saved.";
  }
}

window.addEventListener("online", async () => {
  console.log("Connection restored. Starting sync...");

  updateConnectionStatus();

  await syncChanges();
});

window.addEventListener("offline", () => {
  console.log("Connection lost. Changes will be saved locally.");

  updateConnectionStatus();

  syncStatus.textContent = "Offline. Changes are being saved locally.";
});

document.querySelector("#sync-button")?.addEventListener("click", syncChanges);

async function init() {
  updateConnectionStatus();

  await initKanban();

  if (navigator.onLine) {
    await syncChanges();
  }

  console.log("Kanban initialized with IndexedDB persistence.");
}

init();
