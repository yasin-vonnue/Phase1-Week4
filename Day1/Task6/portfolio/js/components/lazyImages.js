export function initLazyImages() {
  const images = document.querySelectorAll("img[data-src");

  if (!images.length) {
    return;
  }

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const image = entry.target;
        const source = image.dataset.src;

        if (source) {
          image.src = source;
          image.removeAttribute("data-src");
        }

        observer.unobserve(image);
      });
    },
    {
      rootMargin: "100px",
    },
  );

  images.forEach((image) => {
    imageObserver.observe(image);
  });
}
