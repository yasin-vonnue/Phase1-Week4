const nodesContainer = document.querySelector("#nodes");

const mapStatus = document.querySelector("#map-status");

const weakMapStatus = document.querySelector("#weakmap-status");

const userStatus = document.querySelector("#user-status");

const nodeMap = new Map();

let mapNodes = [];

function createMapNodes() {
  mapNodes = [];

  for (let i = 0; i < 1000; i += 1) {
    const node = document.createElement("div");

    node.className = "demo-node";
    node.textContent = `Map Node ${i + 1}`;

    nodesContainer.append(node);

    nodeMap.set(node, {
      createdAt: Date.now(),
    });

    mapNodes.push(node);
  }

  updateMapStatus();

  console.log("Map entries after creation:", nodeMap.size);
}

function removeMapNodes() {
  mapNodes.forEach((node) => {
    node.remove();
  });

  mapNodes = [];

  updateMapStatus();

  console.log(
    "DOM nodes removed, but Map still contains:",
    nodeMap.size,
    "entries",
  );
}

function clearMap() {
  nodeMap.clear();

  updateMapStatus();

  console.log("Map cleared. Entries:", nodeMap.size);
}

function updateMapStatus() {
  mapStatus.textContent = `Map entries: ${nodeMap.size}`;
}

document.querySelector("#create-map").addEventListener("click", createMapNodes);

document.querySelector("#remove-map").addEventListener("click", removeMapNodes);

document.querySelector("#clear-map").addEventListener("click", clearMap);

const nodeWeakMap = new WeakMap();

let weakMapNodes = [];

function createWeakMapNodes() {
  weakMapNodes = [];

  for (let i = 0; i < 1000; i += 1) {
    const node = document.createElement("div");

    node.className = "demo-node";
    node.textContent = `WeakMap Node ${i + 1}`;

    nodesContainer.append(node);

    nodeWeakMap.set(node, {
      createdAt: Date.now(),
    });

    weakMapNodes.push(node);
  }

  weakMapStatus.textContent = "1000 nodes created and stored in WeakMap.";

  console.log("WeakMap nodes created.");
}

function removeWeakMapNodes() {
  weakMapNodes.forEach((node) => {
    node.remove();
  });

  weakMapNodes = [];

  weakMapStatus.textContent =
    "DOM nodes removed. WeakMap does not prevent garbage collection.";

  console.log("WeakMap references can be garbage collected.");
}

document
  .querySelector("#create-weakmap")
  .addEventListener("click", createWeakMapNodes);

document
  .querySelector("#remove-weakmap")
  .addEventListener("click", removeWeakMapNodes);

const privateData = new WeakMap();

class User {
  constructor(name, password) {
    privateData.set(this, {
      name,
      password,
    });
  }

  getName() {
    return privateData.get(this).name;
  }

  getPassword() {
    return privateData.get(this).password;
  }
}

let currentUser = null;

document
  .querySelector("#create-user")

  .addEventListener("click", () => {
    currentUser = new User("Arthur", "secret123");

    userStatus.textContent = "User created. Private data stored in WeakMap.";

    console.log("User created:", currentUser);

    console.log("Public properties:", Object.keys(currentUser));
  });

document.querySelector("#show-user").addEventListener("click", () => {
  if (!currentUser) {
    userStatus.textContent = "Create a user first.";

    return;
  }

  userStatus.textContent =
    `Name: ${currentUser.getName()} | ` +
    `Password: ${currentUser.getPassword()}`;

  console.log("Private name:", currentUser.getName());

  console.log("Private password:", currentUser.getPassword());
});
