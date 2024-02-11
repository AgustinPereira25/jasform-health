import { Link, useLocation } from "react-router-dom";

import { ROUTES } from "@/router";
import { useUserStore } from "@/stores";
import { icons } from "@/ui";
import { tw } from "@/utils";
import { LogOutLogo } from "./components";
import { isValidImageUrl } from "@/helpers/helpers";

const navigation = [
    // {
    //     path: ROUTES.home,
    //     label: "Dashboard",
    //     icon: <icons.DashboardIcon />,
    //     role_name: "admin",
    // },
    {
        path: ROUTES.forms,
        label: "My Forms",
        icon: <icons.MyFormsIcon />,
        role_name: "admin",
    },
    {
        path: ROUTES.users,
        label: "System's Users",
        icon: <icons.UsersIcon />,
        role_name: "admin",
    },
    {
        path: "#",
        label: "System's Forms",
        icon: <icons.SystemsFormsIcon />,
        role_name: "",
    },
    // {
    //     path: "#",
    //     label: "System's Billing",
    //     icon: <icons.SystemsBillingIcon />,
    //     role_name: "",
    // },
    {
        path: "/profile",
        label: "View Profile",
        icon: <LogOutLogo />,
        role_name: "all",
    },
] as const;

export const Sidebar = ({
    onCloseSidebar,
}: {
    onCloseSidebar?: () => void;
}) => {
    const { pathname: currentPath } = useLocation();
    // TODO - Put real user here and change mocked user in Layout.tsx
    // const { user: mockUser, setToken } = useUserStore();
    const { user: mockUser } = useUserStore();

    const logout = () => {
        alert("Logout");
    };

    return (
        <div className="flex h-screen w-[206px] grow flex-col gap-y-12 overflow-y-auto bg-[#1B4A76] ring-1 ring-white/5">
            <div className="flex justify-center h-4 p-2 pt-4 object-contain">
                <img src='/JASForm_Isologo_big_transp_white.png' alt="Logo" className="h-10" />
            </div>

            {mockUser && (
                <nav className="flex flex-1 flex-col">
                    <ul className="flex flex-1 flex-col gap-y-7 overflow-y-auto">
                        {navigation
                            .filter((item) =>
                                item.role_name.includes(
                                    mockUser.role_name?.toLowerCase() ?? ""
                                )
                            )
                            .map((item) => (
                                <li
                                    key={item.label}
                                    className={tw(
                                        item.path === currentPath
                                            ? "bg-[#00519E] text-white"
                                            : "text-gray-400 hover:bg-[#407EC9] hover:text-white"
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
                    </ul>
                    <hr className="w-11/12 bg-[#407EC9]" />
                    {/* <button
                    onClick={() => setToken(null)}
                    className="pl-5 group flex w-full gap-x-3 p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-[#407EC9] hover:text-white"
                  >
                    <icons.ArrowLeftOnRectangleIcon className="w-6" />
                    Sign Out
                  </button> */}
                    <ul className="flex flex-col gap-y-0 overflow-y-auto">
                        {navigation
                            .filter((item) => item.role_name === "")
                            .map((item) => (
                                <li
                                    key={item.label}
                                    className={tw(
                                        item.path === currentPath
                                            ? "bg-[#00519E] text-white"
                                            : "bg-[#1B4A76] text-gray-400 hover:bg-[#407EC9] hover:text-white"
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
                    </ul>
                    <hr className="w-11/12 bg-[#407EC9]" />
                    <ul className="flex flex-col gap-y-0 overflow-y-auto">
                        {navigation
                            .filter((item) => item.role_name === "all")
                            .map((item) => (
                                <li
                                    key={item.label}
                                    className="mt-auto flex items-center gap-x-3 bg-[#0B365F] py-8 pr-3 text-sm font-semibold leading-6 text-white"
                                >
                                    <div
                                        // className="flex gap-3 bg-gray-500 pl-10 py-2 rounded-r-xl items-center w-10/12"
                                        className={tw(
                                            item.path === currentPath
                                                ? "flex w-10/12 items-center gap-3 rounded-r-xl bg-[#00519E] py-2 pl-8 pr-3 text-white"
                                                : "flex w-10/12 items-center gap-3 rounded-r-xl py-2 pl-8 pr-3 text-white"
                                        )}
                                    >
                                        <img
                                            referrerPolicy="no-referrer"
                                            className="-ml-1 h-8 w-8 rounded-full bg-gray-800"
                                            src={
                                                isValidImageUrl(mockUser?.photo ?? "")
                                                    ? mockUser?.photo
                                                    : "/Profile-Hello-Smile1b.png"
                                            }
                                            alt={mockUser.first_name}
                                        />
                                        <span className="sr-only">Your profile</span>
                                        <div>
                                            <span aria-hidden="true">
                                                {mockUser.first_name} {mockUser.last_name}
                                            </span>
                                            <Link
                                                to="/profile"
                                                className="flex text-xs font-normal text-nowrap text-[#8C92AB]"
                                            >
                                                <span>{item.label}</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <button
                                        className="mr-2"
                                        onClick={logout}
                                        title="Logout"
                                    >
                                        {item.icon}
                                    </button>
                                </li>
                            ))}
                    </ul>

                </nav>
            )}
        </div>
    );
};
