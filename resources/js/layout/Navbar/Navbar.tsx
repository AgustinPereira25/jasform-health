import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { Sidebar } from "./Sidebar";
import { ClosedSidebar } from "./ClosedSidebar";
import { navigation } from "./Sidebar";
import { useUserStore } from "@/stores";
import { ROUTES } from "@/router";
import { logOutUserMutation } from "@/screens";

export const Navbar = () => {

  const navigate = useNavigate();
  const { token, clearUser } = useUserStore();
  useEffect(() => {
    if (!token) {
      navigate(ROUTES.login);
    }
  }, []);

  const { pathname: currentPath } = useLocation();
  // TODO - Put real user here and change mocked user in Layout.tsx
  // const { user: user, setToken } = useUserStore();

  const { user } = useUserStore();

  const { mutate: logOutMutation, isPending: isPendingLogOutUserMutation } =
    useMutation({
      mutationFn: logOutUserMutation.mutation,
      onSuccess: () => {
        clearUser();
        localStorage.clear()
        navigate(ROUTES.login);
      },
    });

  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [hasHovered, setHasHovered] = useState(false);

  const toggleNavbar = () => {
    if (!hasHovered) {
      setNavbarOpen((prevState) => !prevState);
      setHasHovered(true);
    }
  };

  const closeNavbar = () => {
    setNavbarOpen(false);
    setHasHovered(false);
  }

  // enviar user, logOutMutation, isPendingLogOutUserMutation, currentPath, navigation
  return (
    <>
      <div
        className={`h-screen transition-width duration-1000 ease-in-out ${isNavbarOpen ? 'w-[206px]' : 'w-[80px]'}`}
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        onMouseOver={toggleNavbar} // Use onMouseOver instead of onMouseEnter
        onMouseLeave={closeNavbar}
      >
        {
          isNavbarOpen ? <Sidebar closeNavbar={closeNavbar} user={user} currentPath={currentPath} isPendingLogOutUserMutation={isPendingLogOutUserMutation} logOutMutation={logOutMutation} navigation={navigation} /> : <ClosedSidebar closeNavbar={closeNavbar} user={user} currentPath={currentPath} isPendingLogOutUserMutation={isPendingLogOutUserMutation} logOutMutation={logOutMutation} navigation={navigation} />
        }
      </div>
    </>
  );
};
