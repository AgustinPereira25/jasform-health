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
  //FormInstance (list, create, update, delete formInstances to submit)
  formInstances: "/form-instance/:publicCode",
  formInstanceList: "/form-instance",
  formInstanceCreate: "/form-instance/new",

} as const;

export const MODAL_ROUTES = {
  exampleModal: "/example-modal",
  userForm: "/user-form",
} as const;
