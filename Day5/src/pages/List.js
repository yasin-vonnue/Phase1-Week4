import { Button } from "../components/Button.js";
import { Card } from "../components/Card.js";
import { Modal } from "../components/Modal.js";

export function renderListPage(params, store) {
  const section = document.createElement("section");

  section.className = "page";

  const heading = document.createElement("h1");

  heading.textContent = "Task List";

  const form = document.createElement("form");

  const input = document.createElement("input");

  input.type = "text";
  input.name = "title";
  input.placeholder = "Enter task title";
  input.required = true;

  const submitButton = Button({
    text: "Add Task",
  });

  submitButton.type = "submit";

  form.append(input, submitButton);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = input.value.trim();

    if (!title) {
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      title,
      description: "Added from task form",
      completed: false,
    };

    store.dispatch({
      type: "ADD_TASK",
      payload: newTask,
    });

    input.value = "";
  });

  const taskCard = Card({
    title: "Learn JavaScript",
    content: "Practice DOM manipulation and modules.",
  });

  const modal = Modal({
    title: "Delete Task",
    content: "Are you sure you want to delete this task?",
  });

  section.append(heading, form, taskCard, modal);

  return section;
}
