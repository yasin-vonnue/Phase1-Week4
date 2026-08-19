if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("./sw.js");

      console.log("Service Worker registered:", registration.scope);

      const status = document.querySelector("#status");

      if (status) {
        status.textContent = "Service Worker registered successfully.";
      }
    } catch (error) {
      console.error("Service Worker registration failed:", error);

      const status = document.querySelector("#status");

      if (status) {
        status.textContent = "Service Worker registration failed.";
      }
    }
  });
}

const apiButton = document.querySelector("#api-button");

const apiStatus = document.querySelector("#api-status");

apiButton?.addEventListener("click", async () => {
  apiStatus.textContent = "Fetching API data...";

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    apiStatus.textContent = `API result: ${data.title}`;

    console.log("API response:", data);
  } catch (error) {
    console.error("API request failed:", error);

    apiStatus.textContent =
      "API request failed. Check your network connection.";
  }
});
