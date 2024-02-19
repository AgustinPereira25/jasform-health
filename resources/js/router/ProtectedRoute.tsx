import type { ReactNode } from "react";
// import { Navigate, Outlet } from "react-router-dom";
import { Outlet } from "react-router-dom";

// import { useUserStore } from "@/stores/useUserStore";
import { ROUTES } from "./routes";

type UserState = "loggedOut" | "standard" | "admin";

// No sacar esto sino no anda mas el router.
 
const HOME = {
  loggedOut: ROUTES.login,
  admin: ROUTES.users,
  standard: ROUTES.home,
} as const;

export const ProtectedRoute = ({
  children,
  // expected,
}: {
  children?: ReactNode;
  expected: UserState | UserState[];
}) => {
  // const userState = useUserStore((state) =>
  //   state.token ? state.user?.role ?? "standard" : "loggedOut",
  // );

  // if (!expected.includes(userState)) {
  //   return <Navigate to={HOME[userState]} replace />;
  // }
  // if puesto para que no patee ts
  if (HOME.admin === '/users')
    return children ? <>{children}</> : <Outlet />;
};
