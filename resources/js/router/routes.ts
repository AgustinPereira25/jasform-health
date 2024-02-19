export const ROUTES = {
  base: "/",
  login: "/login",
  home: "/home",
  users: "/users",
  myForms: "/my-forms",
  forms: "/forms",
  profile: "/profile",
  editUser: "/users/:id",
  deleteUser: "/users/:id/delete",
  newUser: "/users/new",
  newForm: "/forms/new",
  editForm: "/forms/:id",
  questionsForm: "/forms/:id/questions",
  // instance Form Routes
  instanceFormHome: "/instance-form",
  instanceForm: "/instance-form/:publicCode",
  notFound: "*",
} as const;

export const MODAL_ROUTES = {
  exampleModal: "/example-modal",
  userForm: "/user-form",
} as const;
