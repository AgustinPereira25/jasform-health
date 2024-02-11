export const ROUTES = {
  base: "/",
  login: "/login",
  home: "/home",
  users: "/users",
  forms: "/forms",
  profile: "/profile",
  editUser: "/users/:id",
  deleteUser: "/users/:id/delete",
  newUser: "/users/new",
  newForm: "/forms/new",
  editForm: "/forms/:id",
  questionsForm: "/forms/:id/questions",
  // Issue Form Routes
  issueFormHome: "/issue-form",
  issueForm: "/issue-form/:id",
  notFound: "*",
} as const;

export const MODAL_ROUTES = {
  exampleModal: "/example-modal",
  userForm: "/user-form",
} as const;
