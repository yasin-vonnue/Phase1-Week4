export const initialState = {
  route: {
    path: "/home",
    params: {},
  },

  tasks: [
    {
      id: "1",
      title: "Learn JavaScript",
      description: "Practice DOM manipulation",
      completed: false,
    },
  ],

  loading: false,

  error: null,

  settings: {
    theme: "light",
  },
};
