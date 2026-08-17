export function initMutationAnimations() {
  const feed = document.querySelector("[data-blog-feed]");

  if (!feed) {
    return;
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) {
          return;
        }

        const articles = [];

        if (node.matches("article")) {
          articles.push(node);
        }

        articles.push(...node.querySelectorAll("article"));

        articles.forEach((article) => {
          article.classList.add("scroll-animate");

          requestAnimationFrame(() => {
            article.classList.add("is-visible");
          });
        });
      });
    });
  });

  observer.observe(feed, {
    childList: true,
    subtree: true,
  });
}
