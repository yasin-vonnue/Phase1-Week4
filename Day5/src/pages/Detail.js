export function renderDetail(params) {
  const section = document.createElement("section");

  section.innerHTML = `
    <h1>Task Detail</h1>
    <p>Task ID: ${params.id}</p>`;

  return section;
}
