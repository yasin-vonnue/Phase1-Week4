export function renderList() {
  const section = document.createElement("section");

  section.innerHTML = `
    <h1>Task List</h1>
    <p>Your tasks will appear here.</p>`;

  return section;
}
