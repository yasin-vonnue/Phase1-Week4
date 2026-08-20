export function initMatchMedia() {
  const breakpoints = [
    {
      query: "(max-width: 768px)",
      label: "768px",
    },
    {
      query: "(max-width: 1024px)",
      label: "1024px",
    },
  ];

  breakpoints.forEach(({ query, label }) => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event) => {
      console.log(
        `Viewport crossed ${label}: ${event.matches ? "below" : "above"} breakpoint`,
      );
    };

    mediaQuery.addEventListener("change", handleChange);
  });
}
