import { initNavigation } from "./components/nav.js";
import { initDarkMode } from "./components/darkMode.js";
import { initAccordion } from "./components/accordion.js";
import { initLightbox } from "./components/lightbox.js";
import { initScrollAnimations } from "./components/scrollAnimations.js";
import { initBackToTop } from "./components/backToTop.js";
import { initReadingProgress } from "./components/readingProgress.js";
import { initContactFormValidation } from "./components/formValidator.js";
import { initServicesAPI } from "./components/serviceApi.js";
import { initTeamAPI } from "./components/teamApi.js";
import { initHomeNewAPI } from "./components/homeNewApi.js";
import { initStickySectionHeader } from "./components/stickySectionHeader.js";
import { initCountUp } from "./components/countUp.js";
import { initMutationAnimations } from "./components/mutationAnimations.js";
import { initMutationLogger } from "./components/mutationLogger.js";
import { initResizeChart } from "./components/resizeChart.js";
import { initMatchMedia } from "./components/matchMedia.js";
import { initVirtualScroll } from "./virtualScroll.js";

initNavigation();
initDarkMode();
initAccordion();
initLightbox();
initScrollAnimations();
initBackToTop();
initReadingProgress();
initContactFormValidation();
initServicesAPI();
initTeamAPI();
initHomeNewAPI();
initStickySectionHeader();
initCountUp();
initMutationAnimations();
initMutationLogger();
initResizeChart();
initMatchMedia();
initVirtualScroll();

const addBlogPostButton = document.querySelector("#add-blog-post");
const blogFeed = document.querySelector("[data-blog-feed]");

if (addBlogPostButton && blogFeed) {
  addBlogPostButton.addEventListener("click", () => {
    const article = document.createElement("article");

    article.className = "card";

    article.innerHTML = `
        <h3>New Dynamic Blog Post</h3>
        <p>
           This article was added dynamically and detected by MutationObserver.
        </p>
        `;

    blogFeed.append(article);
  });
}
