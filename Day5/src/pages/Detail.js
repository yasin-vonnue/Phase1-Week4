export function renderDetailPage(params) {
  const section = document.createElement("section");

  section.className = "page";

  const heading = document.createElement("h1");
  heading.textContent = "Task Detail";

  const paragraph = document.createElement("p");
  paragraph.textContent = `Task ID: ${params.id}`;

  section.append(heading, paragraph);

  return section;
}
