import { storageManager } from "./storageManager.js";

const localSetButton = document.querySelector("#local-set");
const localGetButton = document.querySelector("#local-get");
const localOutput = document.querySelector("#local-output");

localSetButton.addEventListener("click", () => {
  localStorage.setItem("username", "Arthur");

  localOutput.textContent = "Saved username = Arthur to localStorage.";
});

localGetButton.addEventListener("click", () => {
  const username = localStorage.getItem("username");

  localOutput.textContent = username
    ? `localStorage value: ${username}`
    : "No username found in localStorage.";
});

const sessionSetButton = document.querySelector("#session-set");
const sessionGetButton = document.querySelector("#session-get");
const sessionOutput = document.querySelector("#session-output");

sessionSetButton.addEventListener("click", () => {
  const tabId = `Tab-${Date.now()}`;

  sessionStorage.setItem("tabId", tabId);

  sessionOutput.textContent = `Saved sesssionStorage value: ${tabId}`;
});

sessionGetButton.addEventListener("click", () => {
  const tabId = sessionStorage.getItem("tabId");

  sessionOutput.textContent = tabId
    ? `This tab's sessionStorage value: ${tabId}`
    : "No sessionStorage value found in this tab.";
});

const storageSetButton = document.querySelector("#storage-set");
const storageGetButton = document.querySelector("#storage-get");
const storageDeleteButton = document.querySelector("#storage-delete");
const storageClearButton = document.querySelector("#storage-clear");
const storageOutput = document.querySelector("#storage-output");

storageSetButton.addEventListener("click", () => {
  storageManager.set(
    "temporaryMessage",
    "This value expires after 5 seconds.",
    5000,
  );

  storageOutput.textContent = "TTL item saved. It will expire in 5 seconds.";
});

storageGetButton.addEventListener("click", () => {
  const value = storageManager.get("temporaryMessage");

  storageOutput.textContent = value
    ? `Stored value: ${value}`
    : "The item does not exist or has expired.";
});

storageDeleteButton.addEventListener("click", () => {
  storageManager.delete("temporaryMessage");

  storageOutput.textContent = "TTL item deleted.";
});

storageClearButton.addEventListener("click", () => {
  storageManager.clear();

  storageOutput.textContent = "localStorage has been cleared.";
});
