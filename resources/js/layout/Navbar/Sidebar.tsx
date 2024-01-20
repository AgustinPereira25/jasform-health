import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { ROUTES } from "@/router";
import { User, useUserStore } from "@/stores";
import { icons } from "@/ui";
import { tw } from "@/utils";
import { LogOutLogo, NavbarLogo } from "./components";

const navigation = [
  {
    path: ROUTES.home,
    label: "Dashboard",
    icon: <icons.DashboardIcon />,
    role: "admin",
  },
  {
    path: ROUTES.forms,
    label: "My Forms",
    icon: <icons.MyFormsIcon />,
    role: "admin",
  },
  //   {
  //     path: "#",
  //     label: "My Bills",
  //     icon: <icons.MyBillsIcon />,
  //     role: "admin",
  //   },
  //   {
  //     path: "#",
  //     label: "My Subscription",
  //     icon: <icons.MySubscriptionIcon />,
  //     role: "admin",
  //   },
  {
    path: ROUTES.users,
    label: "Users",
    icon: <icons.UsersIcon />,
    role: "",
  },
  {
    path: "#",
    label: "System's Forms",
    icon: <icons.SystemsFormsIcon />,
    role: "",
  },
  {
    path: "#",
    label: "System's Billing",
    icon: <icons.SystemsBillingIcon />,
    role: "",
  },
  {
    path: "/profile",
    label: "View profile",
    icon: <LogOutLogo />,
    role: "all",
  },
] as const;

export const Sidebar = ({
  onCloseSidebar,
}: {
  onCloseSidebar?: () => void;
}) => {
  const { pathname: currentPath } = useLocation();
  // TODO - Put real user here and change mocked user in Layout.tsx
  const { user: mockUser, setToken } = useUserStore();

  return (
    <div className="flex h-screen grow flex-col gap-y-12 overflow-y-auto bg-[#1B4A76] ring-1 ring-white/5">
      <div className="flex h-16 shrink-0 p-8">
        <NavbarLogo />
      </div>
      {mockUser && (
        <nav className="flex flex-1 flex-col ">
          <ul className="flex flex-1 flex-col gap-y-7 overflow-y-auto">
            <li className="flex-1">
              <ul className="relative h-full">
                {navigation
                  .filter((item) =>
                    item.role.includes(mockUser.role_name!.toLowerCase()),
                  )
                  .map((item) => (
                    <li
                      key={item.label}
                      className={tw(
                        item.path == currentPath
                          ? "bg-[#00519E] text-white"
                          : "text-gray-400 hover:bg-[#407EC9] hover:text-white",
                      )}
                    >
                      <Link
                        to={item.path}
                        onClick={onCloseSidebar}
                        className="group flex gap-x-3 py-3 pl-5 text-sm font-semibold"
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    </li>
                  ))}
                <li className="absolute bottom-0 w-full">
                  <div className="flex justify-center">
                    <hr className="w-11/12 bg-[#407EC9]" />
                  </div>
                  {/* <button
                    onClick={() => setToken(null)}
                    className="pl-5 group flex w-full gap-x-3 p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-[#407EC9] hover:text-white"
                  >
                    <icons.ArrowLeftOnRectangleIcon className="w-6" />
                    Sign Out
                  </button> */}
                  {navigation
                    .filter((item) => item.role === "")
                    .map((item) => (
                      <li
                        key={item.label}
                        className={tw(
                          item.path == currentPath
                            ? "bg-[#00519E] text-white"
                            : "bg-[#1B4A76] text-gray-400 hover:bg-[#407EC9] hover:text-white",
                        )}
                      >
                        <Link
                          to={item.path}
                          onClick={onCloseSidebar}
                          className="group flex gap-x-3 py-3 pl-5 text-sm font-semibold"
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      </li>
                    ))}
                </li>
              </ul>
            </li>
            {navigation
              .filter((item) => item.role === "all")
              .map((item) => (
                <li
                  key={item.label}
                  className="mt-auto flex items-center gap-x-3 bg-[#0B365F] py-8 pr-3 text-sm font-semibold leading-6 text-white"
                >
                  <div
                    // className="flex gap-3 bg-gray-500 pl-10 py-2 rounded-r-xl items-center w-10/12"
                    className={tw(
                      item.path == currentPath
                        ? "flex w-10/12 items-center gap-3 rounded-r-xl bg-[#00519E] py-2 pl-10 text-white"
                        : "flex w-10/12 items-center gap-3 rounded-r-xl py-2 pl-10 text-white",
                    )}
                  >
                    <img
                      referrerPolicy="no-referrer"
                      className="h-8 w-8 rounded-full bg-gray-800"
                      src={mockUser.photo}
                      alt={mockUser.first_name}
                    />
                    <span className="sr-only">Your profile</span>
                    <div>
                      <span aria-hidden="true">
                        {mockUser.first_name} {mockUser.last_name}
                      </span>
                      <Link
                        to="/profile"
                        className="flex text-xs font-normal text-[#8C92AB]"
                      >
                        <span>{item.label}</span>
                      </Link>
                    </div>
                  </div>
                  {item.icon}
                </li>
              ))}
          </ul>
        </nav>
      )}
    </div>
  );
};
