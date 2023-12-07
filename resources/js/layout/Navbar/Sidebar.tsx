import { Link, useLocation } from "react-router-dom";

import { ROUTES } from "@/router";
import { User, useUserStore } from "@/stores";
import { icons } from "@/ui";
import { tw } from "@/utils";
import { NavbarLogo, LogOutLogo } from "./components";

const navigation = [
  {
    path: ROUTES.home,
    label: "Home",
    icon: <icons.HomeIcon className="w-6" />,
    role: ["standard", "admin"],
  },
  {
    path: ROUTES.users,
    label: "Users",
    icon: <icons.UserGroupIcon className="w-6" />,
    role: "admin",
  },
] as const;

export const Sidebar = ({
  onCloseSidebar,
}: {
  onCloseSidebar?: () => void;
}) => {
  const { pathname: currentPath } = useLocation();
  const { user, setToken } = useUserStore();

  // MOCK USER FOR TESTING
  const mockUser: User = {
    email: 'mockemail@gmail.com',
    name: 'UserTest Smith',
    picture: '',
    role: 'admin',
  }
  console.log(navigation)
  return (
    <div className="flex h-screen grow flex-col gap-y-12 overflow-y-auto bg-[#1B4A76] ring-1 ring-white/5">
      <div className="p-8 flex h-16 shrink-0">
        <NavbarLogo />
      </div>
      {mockUser && (
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-7">
            <li className="flex-1">
              <ul className="relative h-full">
                {navigation
                  .filter((item) => item.role.includes(mockUser.role))
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
                        className="pl-5 group flex gap-x-3 py-3 text-sm font-semibold leading-6"
                      // className={tw(
                      //   item.path == currentPath
                      //     ? "bg-[#00519E] text-white"
                      //     : "text-gray-400 hover:bg-gray-800 hover:text-white",
                      //   "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                      // )}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    </li>
                  ))}
                <li className="absolute bottom-0 w-full">
                  <button
                    onClick={() => setToken(null)}
                    className="pl-5 group flex w-full gap-x-3 p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-[#407EC9] hover:text-white"
                  >
                    <icons.ArrowLeftOnRectangleIcon className="w-6" />
                    Sign Out
                  </button>
                </li>
              </ul>
            </li>

            <li className="flex items-center gap-x-4 px-6 py-8 text-sm font-semibold leading-6 text-white mt-auto bg-[#0B365F]">
              <img
                referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-full bg-gray-800"
                src={mockUser.picture}
                alt={mockUser.name}
              />
              <span className="sr-only">Your profile</span>
              <div>
                <span aria-hidden="true">{mockUser.name}</span>
                <Link
                  to="#"
                  className="flex text-xs font-normal leading-6 text-[#8C92AB]"
                >
                  <span>View Profile</span>
                </Link>
              </div>
              <LogOutLogo />
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
