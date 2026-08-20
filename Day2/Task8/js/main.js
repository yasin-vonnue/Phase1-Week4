import { initCountUp } from "./components/countUp.js";

import { initUploadProgress } from "./components/uploadProgress.js";

import { initWillChange } from "./components/willChange.js";

import { initAnimationComparison } from "./components/animationComparison.js";

function init() {
  initCountUp();
  initUploadProgress();
  initWillChange();
  initAnimationComparison();

  console.log("Animation performance demos initialized.");
}

init();
