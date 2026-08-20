export function initStickySectionHeader() {
  const sections = document.querySelectorAll("[data-sticky-section]");

  if (!sections.length) {
    return;
  }

  const stickyHeader = document.createElement("div");

  stickyHeader.className = "sticky-section-header";
  stickyHeader.setAttribute("aria-hidden", "true");

  const stickyTitle = document.createElement("span");

  stickyTitle.className = "sticky-section-title";

  stickyHeader.append(stickyTitle);
  document.body.append(stickyHeader);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          const title = entry.target.dataset.stickyTitle;

          if (title) {
            stickyTitle.textContent = title;
            stickyHeader.classList.add("is-visible");
          }
        }

        if (entry.isIntersecting) {
          stickyHeader.classList.remove("is-visible");
        }
      });
    },
    {
      rootMargin: "-80px 0px 0px 0px",
      threshold: 0,
    },
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}
