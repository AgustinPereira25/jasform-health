import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

// import { useUserStore } from "@/stores/useUserStore";
// import { ROUTES } from "./routes";

type UserState = "loggedOut" | "standard" | "admin";

// const HOME = {
//   loggedOut: ROUTES.login,
//   admin: ROUTES.users,
//   standard: ROUTES.home,
// } as const;

export const ProtectedRoute = ({
  children,
  // expected,
}: {
  children?: ReactNode;
  expected: UserState | UserState[];
}) => {
  // const userState = useUserStore((state) =>
  //   state.token ? state.user?.roles ?? "standard" : "loggedOut",
  // );

  //Todo: fix this
  // if (!expected.includes(userState)) {
  //   return <Navigate to={HOME[userState]} replace />;
  // }

  return children ? <>{children}</> : <Outlet />;
};
