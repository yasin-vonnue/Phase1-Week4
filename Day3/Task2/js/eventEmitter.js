export class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    this.events.get(event).add(listener);

    return this;
  }

  off(event, listener) {
    const listeners = this.events.get(event);

    if (!listeners) {
      return this;
    }

    listeners.delete(listener);

    if (listeners.size === 0) {
      this.events.delete(event);
    }

    return this;
  }

  emit(event, ...args) {
    const listeners = this.events.get(event);

    if (listeners) {
      [...listeners].forEach((listener) => {
        listener(...args);
      });
    }

    const wildcardListeners = this.events.get("*");

    if (wildcardListeners) {
      [...wildcardListeners].forEach((listener) => {
        listener(event, ...args);
      });
    }

    return this;
  }

  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener(...args);
    };

    wrapper.originalListener = listener;

    this.on(event, wrapper);

    return this;
  }
}

const emitter = new EventEmitter();

const handleLogin = (username) => {
  console.log(`${username} logged in`);
};

emitter.on("login", handleLogin);

emitter.emit("login", "Arthur");

emitter.off("login", handleLogin);

emitter.emit("login", "Arthur");

const notificationEmitter = new EventEmitter();

notificationEmitter.on("message", (message) => {
  console.log("Message:", message);
});

notificationEmitter.on("message", (message) => {
  console.log("Received:", message);
});

notificationEmitter.emit("message", "Hello");

const logoutHandler = (username) => {
  console.log(`${username} logged out`);
};

notificationEmitter.on("logout", logoutHandler);

notificationEmitter.emit("logout", "Arthur");

notificationEmitter.off("logout", logoutHandler);

notificationEmitter.emit("logout", "Arthur");

const dataEmitter = new EventEmitter();

dataEmitter.on("data", (id, name, role) => {
  console.log(`ID: ${id}, Name: ${name}, Role: ${role}`);
});

dataEmitter.emit("data", 1, "Arthur", "Developer");

const onceEmitter = new EventEmitter();

onceEmitter.once("welcome", (username) => {
  console.log(`Welcome, ${username}!`);
});

onceEmitter.emit("welcome", "Arthur");

onceEmitter.emit("welcome", "Arthur");

onceEmitter.emit("welcome", "Arthur");

const wildcardEmitter = new EventEmitter();

wildcardEmitter.on("*", (eventName, ...args) => {
  console.log(`Wildcard caught "${eventName}"`, args);
});

wildcardEmitter.emit("login", "Arthur");

wildcardEmitter.emit("logout", "Arthur");

wildcardEmitter.emit("message", "Hello");

class UserStore extends EventEmitter {
  constructor() {
    super();

    this.users = new Map();
  }

  addUser(user) {
    this.users.set(user.id, user);

    this.emit("userAdded", user);

    return user;
  }

  removeUser(userId) {
    const user = this.users.get(userId);

    if (!user) {
      return false;
    }

    this.users.delete(userId);

    this.emit("userRemoved", user);

    return user;
  }

  updateUser(userId, updates) {
    const user = this.users.get(userId);

    if (!user) {
      return false;
    }

    const updatedUser = {
      ...user,
      ...updates,
    };

    this.users.set(userId, updatedUser);

    this.emit("userUpdated", updatedUser);

    return updatedUser;
  }
}

const userStore = new UserStore();

userStore.on("userAdded", (user) => {
  console.log("User added:", user);
});

userStore.on("userRemoved", (user) => {
  console.log("User removed:", user);
});

userStore.on("userUpdated", (user) => {
  console.log("User updated:", user);
});

userStore.on("*", (eventName, user) => {
  console.log(`Event "${eventName}" emitted for:`, user.name);
});

userStore.addUser({
  id: 1,
  name: "Arthur",
  role: "Developer",
});

userStore.updateUser(1, {
  role: "Senior Developer",
});

userStore.removeUser(1);
