export function renderSettingsPage() {
  const section = document.createElement("section");

  const heading = document.createElement("h1");
  heading.textContent = "Settings";

  section.append(heading);

  return section;
}
