import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";

import { Layout, FormInstanceLayout } from "@/layout";
import { NotFound, Users } from "@/screens";
import { Login } from "@/screens/login/Login";
import { Register } from "@/screens/login/Register";
import { Recover } from "@/screens/login/Recover";
import { RecoverPassword } from "@/screens/login/RecoverPassword";
import { PublicCode } from "@/screens/login/PublicCode";
import { Logout } from "@/screens/login/Logout";
import { ModalRouter } from "./ModalRouter";
import { ProtectedRoute } from "./ProtectedRoute";
import { ROUTES } from "./routes";
import { Forms } from "@/screens/forms";
import { Profile } from "@/screens/profile";
// import NewForm from "@/screens/forms/NewForm";
import { PrepareProfileForm } from "@/screens/profile/PrepareProfileForm";
import { PrepareFormForm } from "@/screens/forms/PrepareFormForm";
import { PrepareQuestionsForm } from "@/screens/formQuestions";
import { DeleteUserConfirm } from "@/screens/profile/DeleteUserConfirm";
import { InstanceForm } from "@/screens/instanceForm";
import { CompletedQuestions, FormInstance } from "@/screens/formInstance";
import { FinalStepFrmInstance } from "@/screens/instanceForm/components";
import { MyDashboard } from "@/screens/dashboard";

export const Router = () => {
    const location = useLocation();
    const { previousLocation } = (location.state ?? {}) as {
        previousLocation?: Location;
    };

    return (
        <>
            <Routes location={previousLocation ?? location}>
                {/* PUBLIC ONLY ROUTES */}
                <Route element={<ProtectedRoute expected="loggedOut" />}>
                    <Route element={<Login />} path={ROUTES.login} />
                    <Route element={<Logout />} path={ROUTES.logout} />
                    <Route element={<Register />} path={ROUTES.register} />
                    <Route element={<Recover />} path={ROUTES.recover} />
                    <Route element={<RecoverPassword />} path={ROUTES.recoverPassword} />
                    <Route element={<PublicCode />} path={ROUTES.publicCode} />
                </Route>
                {/* FormInstanceLayout Routes */}
                <Route element={<FormInstanceLayout />}>
                    <Route element={<InstanceForm />} path={ROUTES.instanceForm} />
                    <Route element={<FinalStepFrmInstance />} path={ROUTES.instanceFormFinished} />
                </Route>

                {/* PRIVATE ONLY ROUTES */}
                {/* <Route element={<ProtectedRoute expected={["admin", "creator", "standard"]} />}> */}
                <Route element={<Layout />}>
                    <Route element={<Navigate to={ROUTES.home} />} path={ROUTES.base} />
                    {/* <Route element={<Home />} path={ROUTES.home} /> */}
                    <Route path={ROUTES.notFound} element={<NotFound />} />
                    <Route element={<MyDashboard />} path={ROUTES.myDashboard} />
                    <Route element={<Profile />} path={ROUTES.profile} />
                    <Route element={<PrepareProfileForm />} path={ROUTES.editUser} />
                    <Route element={<Forms />} path={ROUTES.myForms} />
                    <Route element={<PrepareFormForm />} path={ROUTES.newForm} />
                    <Route element={<PrepareFormForm />} path={ROUTES.editForm} />
                    <Route element={<PrepareQuestionsForm />} path={ROUTES.questionsForm} />
                    <Route element={<FormInstance />} path={ROUTES.formInstances} />
                    <Route element={<CompletedQuestions />} path={ROUTES.completedQuestionsList} />
                </Route>
                {/* </Route> */}

                {/* <Route element={<ProtectedRoute expected="admin" />}> */}
                <Route element={<Layout />}>
                    <Route element={<Users />} path={ROUTES.users} />
                    <Route element={<DeleteUserConfirm />} path={ROUTES.deleteUser} />
                    <Route element={<PrepareProfileForm />} path={ROUTES.newUser} />
                    <Route element={<Forms />} path={ROUTES.forms} />
                    <Route element={<Forms />} path={ROUTES.formsByUserId} />
                </Route>
                {/* </Route> */}

                {/* PRIVATE ONLY ROUTES */}
                {/* Acá es cuando el usuario ya entró entonces mostramos una Layout (seria el menu lateral azul y demas) */}
                {/* TODO - Do the same as here in Forms Screen(create PrepareFormForm component and use it in the routes below in order to get data before rendering the form) */}
            </Routes>

            {/* MODALS ROUTES */}
            <Routes>
                <Route
                    path="*"
                    element={<ModalRouter showModal={!!previousLocation} />}
                />
            </Routes>
        </>
    );
};
