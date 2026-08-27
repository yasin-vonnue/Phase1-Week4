const preview = document.querySelector("#preview");

const views = new Set();

const state = new Proxy(
  {
    name: "",
    email: "",
  },
  {
    get(target, property) {
      console.log("GET:", property);

      return target[property];
    },

    set(target, property, value) {
      console.log("SET:", property, "=", value);

      target[property] = value;

      views.forEach((view) => {
        view();
      });

      return true;
    },

    deleteProperty(target, property) {
      console.log("DELETE:", property);

      delete target[property];

      views.forEach((view) => {
        view();
      });

      return true;
    },
  },
);

function updatePreview() {
  preview.textContent =
    `Name: ${state.name || "_"} | ` + `Email: ${state.email || "_"} `;
}

views.add(updatePreview);

updatePreview();

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");

nameInput.addEventListener("input", (event) => {
  state.name = event.target.value;
});

emailInput.addEventListener("input", (event) => {
  state.email = event.target.value;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Delete") {
    delete state.name;
  }
});
