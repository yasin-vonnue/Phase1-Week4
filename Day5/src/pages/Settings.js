export function renderSettingsPage() {
  const section = document.createElement("section");

  section.className = "page";

  const heading = document.createElement("h1");
  heading.textContent = "Settings";

  section.append(heading);

  return section;
}
