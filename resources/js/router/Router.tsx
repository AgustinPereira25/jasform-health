import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";

import { Layout } from "@/layout";
import { Home, NotFound, Users } from "@/screens";
import { Login } from "@/screens/login/Login";
import { ModalRouter } from "./ModalRouter";
import { ProtectedRoute } from "./ProtectedRoute";
import { ROUTES } from "./routes";
import { Forms } from "@/screens/forms";
import { Profile } from "@/screens/profile";
import NewForm from "@/screens/forms/NewForm";
import { PrepareProfileForm } from "@/screens/profile/PrepareProfileForm";
import { PrepareFormForm } from "@/screens/forms/PrepareFormForm";

export const Router = () => {
  const location = useLocation();
  const { previousLocation } = (location.state ?? {}) as {
    previousLocation?: Location;
  };

  return (
    <>
      {/* PUBLIC ONLY ROUTES */}
      <Routes location={previousLocation ?? location}>
        <Route element={<ProtectedRoute expected="loggedOut" />}>
          <Route element={<Login />} path={ROUTES.login} />
        </Route>

        {/* PRIVATE ONLY ROUTES */}
        {/* Acá es cuando el usuario ya entró entonces mostramos una Layout (seria el menu lateral azul y demas) */}
        {/* <Route element={<ProtectedRoute expected={["admin", "standard"]} />}> */}
        <Route element={<Layout />}>
          <Route element={<Navigate to={ROUTES.home} />} path={ROUTES.base} />

          <Route element={<Home />} path={ROUTES.home} />

          <Route path={ROUTES.notFound} element={<NotFound />} />
        </Route>
        {/* </Route> */}

        {/* <Route element={<ProtectedRoute expected="admin" />}> */}
        <Route element={<Layout />}>
          <Route element={<Users />} path={ROUTES.users} />
        </Route>
        {/* </Route> */}

        {/* <Route element={<ProtectedRoute expected="admin" />}> */}
        <Route element={<Layout />}>
          <Route element={<Forms />} path={ROUTES.forms} />
        </Route>
        {/* </Route> */}

        {/* <Route element={<ProtectedRoute expected="admin" />}> */}
        <Route element={<Layout />}>
          <Route element={<PrepareFormForm />} path={ROUTES.newForm} />
        </Route>
        {/* </Route> */}

        {/* <Route element={<ProtectedRoute expected="admin" />}> */}
        <Route element={<Layout />}>
          <Route element={<PrepareFormForm />} path={ROUTES.editForm} />
        </Route>
        {/* </Route> */}

        {/* <Route element={<ProtectedRoute expected="admin" />}> */}
        <Route element={<Layout />}>
          <Route element={<Profile />} path={ROUTES.profile} />
        </Route>
        {/* </Route> */}

      {/* TODO - Do the same as here in Forms Screen(create PrepareFormForm component and use it in the routes below in order to get data before rendering the form) */}
        {/* <Route element={<ProtectedRoute expected="admin" />}> */}
        <Route element={<Layout />}>
          <Route element={<PrepareProfileForm />} path={ROUTES.editUser} />
        </Route>
        {/* </Route> */}

        {/* <Route element={<ProtectedRoute expected="admin" />}> */}
        <Route element={<Layout />}>
          <Route element={<PrepareProfileForm />} path={ROUTES.newUser} />
        </Route>
        {/* </Route> */}
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
