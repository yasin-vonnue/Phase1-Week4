export function initGeolocation() {
  const locationInput = document.querySelector("#location");

  if (!locationInput) {
    return;
  }

  if (!("geolocation" in navigator)) {
    locationInput.value = "Geolocation not supported";
    return;
  }

  locationInput.value = "Detecting location...";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
        );

        if (!response.ok) {
          throw new Error("Reverse geocoding failed");
        }

        const data = await response.json();

        const address = data.address;

        const city =
          address.city ||
          address.town ||
          address.village ||
          address.municipality ||
          "Unknown location";

        locationInput.value = city;
      } catch (error) {
        console.error("Unable to detect city:", error);

        locationInput.value = "Unable to detect city";
      }
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          locationInput.value = "Location permission denied";
          break;

        case error.POSITION_UNAVAILABLE:
          locationInput.value = "Location unavailable";
          break;

        case error.TIMEOUT:
          locationInput.value = "Location request timed out";
          break;

        default:
          locationInput.value = "Unable to detect location";
      }

      console.warn("Geolocation error:", error.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000,
    },
  );
}
