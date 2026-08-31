export async function loadTasks(dispatch) {
  dispatch({
    type: "SET_LOADING",
    payload: true,
  });

  dispatch({
    type: "SET_ERROR",
    payload: null,
  });

  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: "SET_LOADING",
      payload: false,
    });

    dispatch({
      type: "SET_ERROR",
      payload: error.message,
    });
  }
}

export async function loadTasksWithError(dispatch) {
  dispatch({
    type: "SET_LOADING",
    payload: true,
  });

  dispatch({
    type: "SET_ERROR",
    payload: null,
  });

  try {
    await new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Failed to load tasks"));
      }, 1000);
    });
  } catch (error) {
    dispatch({
      type: "SET_LOADING",
      payload: false,
    });

    dispatch({
      type: "SET_ERROR",
      payload: error.message,
    });
  }
}
