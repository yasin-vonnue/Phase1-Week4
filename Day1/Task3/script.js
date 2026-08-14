function createUser({ name, email, role = "viewer", createdAt = Date.now() }) {
  if (!name || typeof name !== "string") {
    throw new Error("Name is required and must be a string");
  }

  if (!email || typeof email !== "string") {
    throw new Error("Email is required and must be a string");
  }

  if (!email.includes("@")) {
    throw new Error("Invalid email address");
  }

  if (typeof role !== "string") {
    throw new Error("Role must be a string");
  }

  if (typeof createdAt !== "number") {
    throw new Error("createdAt must be a number");
  }

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    role,
    createdAt,
  };

  return Object.freeze(user);
}

const user1 = createUser({
  name: "Arthur",
  email: "arthur@example.com",
});

console.log("User 1:", user1);

const user2 = createUser({
  name: "Dutch",
  email: "dutch@example.com",
  role: "admin",
});

console.log("User 2:", user2);

try {
  user1.name = "Changed Name";
} catch (error) {
  console.log("User is frozen");
}

console.log("User name:", user1.name);

try {
  createUser({
    name: "Arthur",
    email: "invalid-email",
  });
} catch (error) {
  console.log("Validation error:", error.message);
}

class QueryBuilder {
  constructor() {
    this.table = null;
    this.conditions = null;
    this.fields = ["*"];
    this.maxResults = null;
  }

  from(table) {
    this.table = table;

    return this;
  }

  where(condition) {
    this.conditions = condition;

    return this;
  }

  select(fields) {
    this.fields = Array.isArray(fields) ? fields : [fields];

    return this;
  }

  limit(n) {
    this.maxResults = n;

    return this;
  }

  build() {
    if (!this.table) {
      throw new Error("Table is required");
    }

    let query = `SELECT ${this.fields.join(", ")} FROM ${this.table}`;

    if (this.conditions) {
      query += ` WHERE ${this.conditions}`;
    }

    if (this.maxResults !== null) {
      query += ` LIMIT ${this.maxResults}`;
    }

    return query;
  }
}

const query1 = new QueryBuilder()
  .from("users")
  .select(["id", "name", "email"])
  .where("role = 'admin'")
  .limit(10)
  .build();

console.log(query1);

const query2 = new QueryBuilder()
  .from("products")
  .where("price > 100")
  .limit(5)
  .build();

console.log(query2);

const query3 = new QueryBuilder()
  .from("orders")
  .select(["id", "total"])
  .build();

console.log(query3);

function createNotification({
  type = "info",
  message = "",
  duration = 3000,
  dismissible = true,
}) {
  const allowedTypes = ["info", "success", "warning", "error"];

  if (!allowedTypes.includes(type)) {
    throw new Error(`Invalid notification type: ${type}`);
  }

  if (typeof message !== "string") {
    throw new Error("Message must be a string");
  }

  if (typeof duration !== "number" || duration < 0) {
    throw new Error("Duration must be a non-negative number");
  }

  if (typeof dismissible !== "boolean") {
    throw new Error("dismissible must be a boolean");
  }

  return {
    type,
    message,
    duration,
    dismissible,

    show() {
      console.log(`[${this.type.toUpperCase()}] ${this.message}`);

      if (this.duration > 0) {
        console.log(`Notification will disappear in ${this.duration}ms`);
      }

      if (this.dismissible) {
        console.log("Notification can be dismissed");
      }
    },
  };
}

const notification1 = createNotification({
  message: "Welcome!",
});

notification1.show();

const notification2 = createNotification({
  type: "success",
  message: "Profile updated successfully",
  duration: 5000,
  dismissible: true,
});

notification2.show();

const notification3 = createNotification({
  type: "error",
  message: "Something went wrong",
  duration: 0,
  dismissible: false,
});

notification3.show();
