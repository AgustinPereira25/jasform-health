export const ROUTES = {
  base: "/",
  login: "/login",
  home: "/home",
  users: "/users",
  forms: "/forms",
  profile: "/profile",
  editUser: "/users/:id",
  newUser: "/users/new",
  newForm: "/forms/new",
  editForm: "/forms/:id",
  questionsForm: "/forms/:id/questions",
  notFound: "*",
} as const;

export const MODAL_ROUTES = {
  exampleModal: "/example-modal",
  userForm: "/user-form",
} as const;
