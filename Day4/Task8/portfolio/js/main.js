import { setupNavigation } from "./components/nav.js";
import { setupDarkMode } from "./components/darkMode.js";
import { setupBackToTop } from "./components/backToTop.js";
import { setupReadingProgress } from "./components/readingProgress.js";
import { setupScrollAnimations } from "./components/scrollAnimations.js";

setupNavigation();
setupDarkMode();
setupBackToTop();
setupReadingProgress();
setupScrollAnimations();

const page = document.body.dataset.page;

if (page === "home") {
  const { setupHomeNewAPI } = await import("./components/homeNewApi.js");

  setupHomeNewAPI();
}

if (page === "team") {
  const { setupTeamAPI } = await import("./components/teamApi.js");

  setupTeamAPI();
}

if (page === "services") {
  const { setupServicesAPI } = await import("./components/serviceApi.js");

  setupServicesAPI();
}

if (page === "contact") {
  const { setupContactFormValidation } =
    await import("./components/formValidator.js");

  setupContactFormValidation();
}
