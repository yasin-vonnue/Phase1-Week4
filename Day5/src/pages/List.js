import { Button } from "../components/Button.js";
import { Card } from "../components/Card.js";
import { navigate } from "../router.js";

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

  const taskList = document.createElement("div");
  taskList.className = "task-list";

  function renderTasks() {
    taskList.innerHTML = "";

    const tasks = store.getState().tasks || [];

    if (tasks.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.textContent = "No tasks yet.";
      taskList.append(emptyMessage);
      return;
    }

    tasks.forEach((task) => {
      const card = Card({
        title: task.title,
        content: task.description || "",
      });

      card.classList.add("task-card");

      const status = document.createElement("label");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;

      checkbox.addEventListener("change", () => {
        store.dispatch({
          type: "TOGGLE_TASK",
          payload: task.id,
        });

        renderTasks();
      });

      status.append(checkbox, " Completed");

      const viewButton = Button({
        text: "View",
      });

      viewButton.type = "button";

      viewButton.addEventListener("click", () => {
        navigate(`/detail/${encodeURIComponent(task.id)}`);
      });

      const editButton = Button({
        text: "Edit",
      });

      editButton.type = "button";

      editButton.addEventListener("click", () => {
        const newTitle = window.prompt("Edit task title:", task.title);

        if (!newTitle || !newTitle.trim()) {
          return;
        }

        store.dispatch({
          type: "UPDATE_TASK",
          payload: {
            id: task.id,
            title: newTitle.trim(),
          },
        });

        renderTasks();
      });

      const deleteButton = Button({
        text: "Delete",
      });

      deleteButton.type = "button";

      deleteButton.addEventListener("click", () => {
        const confirmed = window.confirm(`Delete "${task.title}"?`);

        if (!confirmed) {
          return;
        }

        store.dispatch({
          type: "DELETE_TASK",
          payload: task.id,
        });

        renderTasks();
      });

      const actions = document.createElement("div");
      actions.className = "task-actions";

      actions.append(viewButton, editButton, deleteButton);

      card.append(status, actions);

      taskList.append(card);
    });
  }

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

    renderTasks();
  });

  section.append(heading, form, taskList);

  renderTasks();

  return section;
}
