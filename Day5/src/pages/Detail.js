export function renderDetailPage(params, store) {
  const section = document.createElement("section");
  section.className = "page";

  const heading = document.createElement("h1");
  heading.textContent = "Task Detail";

  const task = store
    ? store.getState().tasks.find((item) => item.id === params.id)
    : null;

  if (!task) {
    const message = document.createElement("p");
    message.textContent = "Task not found.";

    const backLink = document.createElement("a");
    backLink.href = "#/list";
    backLink.dataset.link = "";
    backLink.textContent = "Back to Tasks";

    section.append(heading, message, backLink);

    return section;
  }

  const title = document.createElement("h2");
  title.textContent = task.title;

  const description = document.createElement("p");
  description.textContent = task.description || "No description.";

  const status = document.createElement("p");
  status.textContent = task.completed ? "Status: Completed" : "Status: Pending";

  const backLink = document.createElement("a");
  backLink.href = "#/list";
  backLink.dataset.link = "";
  backLink.textContent = "Back to Tasks";

  section.append(heading, title, description, status, backLink);

  return section;
}
