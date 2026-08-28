export function renderHome() {
  const section = document.createElement("section");

  section.innerHTML = `
    <h1>Home</h1>
    <p>Welcome to the Task Manager.</p>`;

  return section;
}
