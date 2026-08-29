import { Button } from "../components/Button.js";
import { Card } from "../components/Card.js";
import { Modal } from "../components/Modal.js";

export function renderListPage() {
  const section = document.createElement("section");

  const heading = document.createElement("h1");
  heading.textContent = "Task List";

  const addButton = Button({
    text: "Add Task",
  });

  const taskCard = Card({
    title: "Learn JavaScript",
    content: "Practice DOM manipulation and modules.",
  });

  const modal = Modal({
    title: "Delete Task",
    content: "Are you sure you want to delete this task?",
  });

  section.append(heading, addButton, taskCard, modal);

  return section;
}
