export function storageMiddleware({ getState }) {
  return (next) => (action) => {
    const result = next(action);

    const state = getState();

    const stateToPersist = {
      tasks: state.tasks,
      settings: state.settings,
    };

    localStorage.setItem("task-manager-state", JSON.stringify(stateToPersist));

    return result;
  };
}

export function loadState() {
  const savedState = localStorage.getItem("task-manager-state");

  if (!savedState) {
    return null;
  }

  try {
    const parsedState = JSON.parse(savedState);

    if (!parsedState || typeof parsedState !== "object") {
      return null;
    }

    return parsedState;
  } catch (error) {
    console.error("Failed to load saved state:", error);

    return null;
  }
}
