export function initUploadProgress() {
  const progressBar = document.querySelector("#upload-progress");

  const uploadButton = document.querySelector("#upload-button");

  const uploadStatus = document.querySelector("#upload-status");

  if (!progressBar || !uploadButton || !uploadStatus) {
    return;
  }

  let uploadTimer = null;
  let animationFrame = null;

  function animateProgress(targetProgress) {
    const currentProgress = Number(progressBar.dataset.progress || 0);

    const startTime = performance.now();
    const duration = 250;

    function update(currentTime) {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      const easedProgress =
        currentProgress + (targetProgress - currentProgress) * progress;

      progressBar.dataset.progress = easedProgress;

      progressBar.style.transform = `scaleX(${easedProgress / 100})`;

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    }

    animationFrame = requestAnimationFrame(update);
  }

  function startUpload() {
    uploadButton.disabled = true;

    progressBar.dataset.progress = "0";

    progressBar.style.transform = "scaleX(0)";

    uploadStatus.textContent = "Uploading... 0%";

    let simulatedProgress = 0;

    uploadTimer = setInterval(() => {
      simulatedProgress += Math.floor(Math.random() * 15) + 5;

      if (simulatedProgress >= 100) {
        simulatedProgress = 100;

        clearInterval(uploadTimer);

        uploadTimer = null;

        animateProgress(100);

        setTimeout(() => {
          uploadStatus.textContent = "Upload complete!";

          uploadButton.disabled = false;
        }, 300);

        return;
      }

      animateProgress(simulatedProgress);

      uploadStatus.textContent = `Uploading... ${simulatedProgress}%`;
    }, 400);
  }

  uploadButton.addEventListener("click", startUpload);

  window.addEventListener("beforeunload", () => {
    if (uploadTimer) {
      clearInterval(uploadTimer);
    }

    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  });
}
