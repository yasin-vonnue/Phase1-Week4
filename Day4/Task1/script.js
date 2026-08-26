const container = document.querySelector("#container");

for (let i = 0; i < 1000; i += 1) {
  const box = document.createElement("div");

  box.className = "box";
  box.textContent = `Box ${i + 1}`;

  container.append(box);
}

const boxes = document.querySelectorAll(".box");

document.querySelector("#thrash").addEventListener("click", () => {
  for (const box of boxes) {
    const height = box.offsetHeight;

    box.style.height = `${height + 1}px`;
  }
});

document.querySelector("#fixed").addEventListener("click", () => {
  const heights = [];

  for (const box of boxes) {
    heights.push(box.offsetHeight);
  }

  boxes.forEach((box, index) => {
    box.style.height = `${heights[index] + 1}px`;
  });
});
