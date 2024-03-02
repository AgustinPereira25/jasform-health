export const ROUTES = {
  base: "/",
  myDashboard: "/home",
  login: "/login",
  register: "/register",
  recover: "/recover",
  logout: "/logout",
  home: "/home",
  users: "/users",
  myForms: "/my-forms",
  forms: "/forms",
  formsByUserId: "/forms/byUserId/:user_id",
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
  instanceFormFinished: "/instance-form/:publicCode/finished",
  notFound: "*",
  //FormInstance (List and show completed questions by FormID)
  formInstances: "/form-instance/:formId",
  completedQuestionsList: "/form-instance/:formId/completed-questions",
} as const;

export const MODAL_ROUTES = {
  exampleModal: "/example-modal",
  userForm: "/user-form",
} as const;
