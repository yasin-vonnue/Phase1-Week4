export function renderHomePage() {
  const section = document.createElement("section");

  section.className = "page";

  const heading = document.createElement("h1");
  heading.textContent = "Home";

  const paragraph = document.createElement("p");
  paragraph.textContent = "Welcome to the Task Manager.";

  section.append(heading, paragraph);

  return section;
}
