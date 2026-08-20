export function initWillChange() {
  const box = document.querySelector("#will-change-box");

  const button = document.querySelector("#will-change-button");

  if (!box || !button) {
    return;
  }

  button.addEventListener("click", () => {
    box.animate(
      [
        {
          transform: "translateX(0)",
        },

        {
          transform: "translateX(500px)",
        },
        {
          transform: "translateX(0)",
        },
      ],
      {
        duration: 1500,
        easing: "ease-in-out",
      },
    );
  });
}
