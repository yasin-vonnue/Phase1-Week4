export function renderSettingsPage(params, store) {
  const section = document.createElement("section");
  section.className = "page";

  const heading = document.createElement("h1");
  heading.textContent = "Settings";

  const label = document.createElement("label");
  label.className = "settings-option";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const currentTheme = store?.getState().settings?.theme || "light";
  checkbox.checked = currentTheme === "dark";

  label.append(checkbox, " Dark Mode");

  const saveButton = document.createElement("button");
  saveButton.type = "button";
  saveButton.textContent = "Save";

  saveButton.addEventListener("click", () => {
    const theme = checkbox.checked ? "dark" : "light";

    document.body.classList.toggle("dark", theme === "dark");

    if (store) {
      store.dispatch({
        type: "SET_THEME",
        payload: theme,
      });
    }
  });

  section.append(heading, label, saveButton);

  return section;
}
