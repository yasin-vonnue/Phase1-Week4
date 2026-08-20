export function initConnection() {
  const connectionStatus = document.querySelector("#connection-status");

  const animatedDemo = document.querySelector("#animated-demo");

  const autoplayButton = document.querySelector("#autoplay-demo");

  if (!connectionStatus || !animatedDemo || !autoplayButton) {
    return;
  }

  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;

  if (!connection) {
    connectionStatus.textContent = "Network Information API is not supported.";

    console.warn("navigator.connection is not supported.");

    return;
  }

  function isSlowConnection() {
    const slowTypes = ["slow-2g", "2g"];

    return (
      slowTypes.includes(connection.effectiveType) ||
      connection.saveData === true
    );
  }

  function updateConnectionState() {
    const slow = isSlowConnection();

    if (slow) {
      animatedDemo.classList.add("animations-disabled");

      autoplayButton.disabled = true;

      autoplayButton.classList.add("autoplay-disabled");

      connectionStatus.textContent =
        `Slow connection detected (${connection.effectiveType}). ` +
        "Animations and autoplay are disabled.";

      console.warn("Slow connection detected:", {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
      });

      return;
    }

    animatedDemo.classList.remove("animations-disabled");

    autoplayButton.disabled = false;

    autoplayButton.classList.remove("autoplay-disabled");

    connectionStatus.textContent =
      `Connection: ${connection.effectiveType}. ` +
      "Animations and autoplay are enabled.";
  }

  updateConnectionState();

  connection.addEventListener("change", updateConnectionState);
}
