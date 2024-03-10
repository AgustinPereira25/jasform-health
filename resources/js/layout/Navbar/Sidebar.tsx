import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { ROUTES } from "@/router";
import { Button, Modal, icons, LoadingOverlay } from "@/ui";
import { tw } from "@/utils";
import { LogOutLogo } from "./components";
import { isValidImageUrl } from "@/helpers/helpers";
import type { MenuBarProps } from "@/shared.types";
import { message } from "@/constants/message";

export const navigation = [
    {
        path: ROUTES.home,
        label: "My Dashboard",
        icon: <icons.DashboardIcon />,
        role_name: "creator, admin",
    },
    {
        path: ROUTES.myForms,
        label: "My Forms",
        icon: <icons.MyFormsIcon />,
        role_name: "creator, admin",
    },
    {
        path: ROUTES.users,
        label: "System's Users",
        icon: <icons.UsersIcon />,
        role_name: "admin",
    },
    {
        path: ROUTES.forms,
        label: "System's Forms",
        icon: <icons.SystemsFormsIcon />,
        role_name: "admin",
    },
    // {
    //     path: "#",
    //     label: "System's Billing",
    //     icon: <icons.SystemsBillingIcon />,
    //     role_name: "admin",
    // },
    {
        path: "/profile",
        label: "View Profile",
        icon: <LogOutLogo />,
        role_name: "all",
    },
] as const;

export const Sidebar: React.FC<MenuBarProps> = ({
    user,
    navigation,
    logOutMutation,
    isPendingLogOutUserMutation,
    currentPath,
    closeNavbar,
}: {
    user: MenuBarProps["user"],
    navigation: MenuBarProps["navigation"],
    logOutMutation: MenuBarProps["logOutMutation"],
    isPendingLogOutUserMutation: MenuBarProps["isPendingLogOutUserMutation"],
    currentPath: MenuBarProps["currentPath"],
    onCloseSidebar?: () => void;
    closeNavbar: MenuBarProps["closeNavbar"],
}) => {

    const navigate = useNavigate();
    const pathname = location.pathname;

    const logout = () => {
        logOutMutation();
    };

    const [showLogOutModal, setShowLogOutModal] = useState(false);
    const [showLostChangesModal, setShowLostChangesModal] = useState<boolean>(false);
    const [routeToNavigate, setRouteToNavigate] = useState<string>("");

    const handleOpenLogOutModal = () => {
        setShowLogOutModal(true);
    };
    const handleCloseLogOutModal = () => {
        setShowLogOutModal(false);
    };

    const handleCloseLostChangesModal = () => {
        setShowLostChangesModal(false);
    }

    const handleLostChanges = () => {
        closeNavbar();
        setShowLostChangesModal(false);
        navigate(routeToNavigate);
    }

    const handleCheckCurrentPath = (route: string) => {
        if (pathname.includes(ROUTES.forms + '/') || pathname.includes(ROUTES.profile) || pathname.includes(ROUTES.newUser)
            || pathname.includes(ROUTES.users + '/')) {
            console.log('TRUE')
            setShowLostChangesModal(true);
            setRouteToNavigate(route);
        } else {
            navigate(route);
        }
    }
    return (
        <div className={`flex flex-col h-screen transition-width duration-500 ease-in-out grow gap-y-12 overflow-y-auto bg-[#1B4A76] ring-1 ring-white/5`}>
            <Modal
                show={showLostChangesModal}
                title="Exit Form"
                description={message.DISCARD_PROCEED_TEXT}
                onClose={handleCloseLostChangesModal}
            >
                <div className="flex h-16 p-3 m-auto">
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-row gap-4 h-16 p-3">
                            <Button aria-label="Cancel" variant="secondary" onClick={handleCloseLostChangesModal} >
                                Cancel
                            </Button>
                            <Button aria-label="Confirm" variant="tertiary" onClick={() => handleLostChanges()} >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
            {(isPendingLogOutUserMutation) && (
                <LoadingOverlay />
            )}
            <div className="flex justify-center h-4 p-2 pt-4 object-contain shrink-0">
                <img src="/JASForm_Isologo_big_transp_white.png" alt="Logo" className="h-10" />
            </div>
            {user && (
                <nav className="flex flex-1 flex-col">
                    <ul className="flex flex-1 flex-col gap-y-0 overflow-y-auto mt-4">
                        {navigation
                            .filter((item) => item.role_name !== "admin" && item.role_name !== "all")
                            .map((item) => (
                                <li
                                    key={item.label}
                                    className={tw(
                                        item.path === currentPath
                                            ? "bg-[#00519E] text-white cursor-pointer"
                                            : "text-gray-400 hover:bg-[#407EC9] hover:text-white cursor-pointer"
                                    )}
                                >
                                    {/* <Link
                                        to={item.path}
                                        //onClick={() => setShowLostChangesModal(true)}
                                        className="group flex gap-x-3 py-3 pl-5 text-sm font-semibold whitespace-nowrap"
                                    >
                                        {item.icon}
                                        {item.label}
                                    </Link> */}
                                    <div
                                        role="presentation"
                                        onClick={() => handleCheckCurrentPath(item.path)}
                                        className="group flex gap-x-3 py-3 pl-5 text-sm font-semibold whitespace-nowrap"
                                    >
                                        {item.icon}
                                        {item.label}
                                    </div>
                                </li>
                            ))}
                    </ul>
                    {
                        user.role_name?.toLowerCase() === "admin" && (
                            <hr className="w-12/12 bg-[#407EC9]" />
                        )
                    }
                    <ul className="flex flex-col gap-y-0 overflow-y-auto">
                        {navigation
                            .filter((item) => item.role_name === user.role_name?.toLowerCase())
                            .map((item) => (
                                <li
                                    key={item.label}
                                    className={tw(
                                        item.path === currentPath
                                            ? "bg-[#00519E] text-white cursor-pointer"
                                            : "bg-[#1B4A76] text-gray-400 hover:bg-[#407EC9] hover:text-white cursor-pointer"
                                    )}
                                >
                                    {/* <Link
                                        to={item.path}
                                        onClick={onCloseSidebar}
                                        className="group flex gap-x-3 py-3 pl-5 text-sm font-semibold whitespace-nowrap"
                                    >
                                        {item.icon}
                                        {item.label}
                                    </Link> */}
                                    <div
                                        role="presentation"
                                        onClick={() => handleCheckCurrentPath(item.path)}
                                        className="group flex gap-x-3 py-3 pl-5 text-sm font-semibold whitespace-nowrap"
                                    >
                                        {item.icon}
                                        {item.label}
                                    </div>
                                </li>
                            ))}
                    </ul>
                    <hr className="w-12/12 bg-[#407EC9]" />
                    <ul className="flex flex-col gap-y-0 overflow-y-auto">
                        {navigation
                            .filter((item) => item.role_name === "all")
                            .map((item) => (
                                <li
                                    key={item.label}
                                    //className="mt-auto flex items-center gap-x-3 bg-[#0B365F] py-8 pr-3 text-sm font-semibold leading-6 text-white"
                                    className="mt-auto flex items-center gap-x-3 bg-[#0B365F] h-28 text-sm font-semibold leading-6 text-white cursor-default"
                                >
                                    <div
                                        // className="flex gap-3 bg-gray-500 pl-10 py-2 rounded-r-xl items-center w-10/12"
                                        className={tw(
                                            item.path === currentPath
                                                ? "flex justify-end grow items-center gap-2 h-full rounded-r-xl bg-[#00519E] text-white"
                                                : "flex justify-end grow items-center gap-2 h-full rounded-r-xl text-white"
                                            // ? "flex w-10/12 items-center gap-3 rounded-r-xl bg-[#00519E] py-2 pl-8 pr-3 text-white"
                                            // : "flex w-10/12 items-center gap-3 rounded-r-xl py-2 pl-8 pr-3 text-white"
                                        )}
                                    >
                                        <img
                                            referrerPolicy="no-referrer"
                                            className="-ml-1 h-8 w-8 rounded-full bg-gray-800"
                                            src={
                                                isValidImageUrl(user?.photo ?? "")
                                                    ? user?.photo
                                                    : "/Profile-Hello-Smile1b.png"
                                            }
                                            alt={user.first_name}
                                        />
                                        <span className="sr-only">Your profile</span>
                                        <div className="flex flex-col w-[100px]">
                                            <span aria-hidden="true">
                                                {user.first_name} {user.last_name}
                                            </span>
                                            {/* <Link
                                                to="/profile"
                                                className="flex text-xs font-normal whitespace-nowrap text-[#8C92AB]"
                                            >
                                                <span>{item.label}</span>
                                            </Link> */}
                                            <div
                                                role="presentation"
                                                onClick={() => handleCheckCurrentPath('/profile')}
                                                className="cursor-pointer flex text-xs font-normal whitespace-nowrap text-[#8C92AB]"
                                            >
                                                <span>{item.label}</span>
                                            </div>
                                        </div>
                                        <div className="cursor-pointer flex flex-col w-9 justify-center items-end h-full">
                                            <button
                                                className="mr-2"
                                                onClick={handleOpenLogOutModal}
                                                title="Logout"
                                            >
                                                {item.icon}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>

                </nav>
            )}
            <Modal
                show={showLogOutModal}
                title="Log out"
                description="Are you sure you want to log out?"
                onClose={handleCloseLogOutModal}
            >
                <div className="flex h-16 p-3 m-auto">
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-row gap-4 h-16 p-3">
                            <Button variant="secondary" onClick={handleCloseLogOutModal} >
                                Cancel
                            </Button>
                            <Button variant="tertiary" onClick={logout} >
                                Log out
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div >
    );
};
