export function initNotifications() {
  const permissionButton = document.querySelector("#notification-permission");

  const permissionStatus = document.querySelector("#notification-status");

  const contactForm = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");

  if (!permissionButton || !permissionStatus || !contactForm) {
    return;
  }

  permissionButton.addEventListener("click", async () => {
    if (!("Notification" in window)) {
      permissionStatus.textContent =
        "Notifications are not supported by this browser.";

      return;
    }

    if (Notification.permission === "granted") {
      permissionStatus.textContent = "Notifications are already enabled.";

      return;
    }

    if (Notification.permission === "denied") {
      permissionStatus.textContent =
        "Notifications are blocked. Enable them in browser settings.";

      return;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      permissionStatus.textContent = "Notifications enabled successfully.";
    } else {
      permissionStatus.textContent = "Notification permission was not granted.";
    }
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (formStatus) {
      formStatus.textContent = "Form submitted successfully.";
    }

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Form Submitted", {
        body: "Your contact form was submitted successfully.",
      });
    }
  });
}
