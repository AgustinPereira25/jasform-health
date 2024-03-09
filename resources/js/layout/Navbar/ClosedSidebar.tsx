/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import type { MenuBarProps } from '@/shared.types'
import { Button, LoadingOverlay, Modal } from '@/ui'
import { tw } from '@/utils';
import { isValidImageUrl } from '@/helpers/helpers';

export const ClosedSidebar: React.FC<MenuBarProps> = ({ user, navigation, logOutMutation, isPendingLogOutUserMutation, currentPath }) => {

    const navigate = useNavigate();

    const logout = () => {
        logOutMutation();
    };

    const [showLogOutModal, setShowLogOutModal] = useState(false);
    const handleOpenLogOutModal = () => {
        setShowLogOutModal(true);
    };
    const handleCloseLogOutModal = () => {
        setShowLogOutModal(false);
    };

    return (
        <div className={`flex h-screen grow flex-col bg-[#1B4A76] items-center`}>
            {(isPendingLogOutUserMutation) && (
                <LoadingOverlay />
            )}
            <div className="flex justify-center p-2 pt-4 object-contain shrink-0 h-[72px]">
                <img src="/JASForm_Isologo_for_small_transp 2.png" alt="Logo" className="h-10" />
            </div>
            {user && (
                <nav className="flex flex-1 flex-col w-full">
                    <ul className="flex flex-1 flex-col gap-y-0 overflow-y-auto mt-4">
                        {navigation
                            .filter((item) => item.role_name !== "admin" && item.role_name !== "all")
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
                                        // TODO - Fix this
                                        // onClick={onCloseSidebar}
                                        className="group flex gap-x-3 py-3 pl-7 text-sm font-semibold"
                                    >
                                        {item.icon}
                                    </Link>
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
                                            ? "bg-[#00519E] text-white"
                                            : "bg-[#1B4A76] text-gray-400 hover:bg-[#407EC9] hover:text-white"
                                    )}
                                >
                                    <Link
                                        to={item.path}
                                        // TODO - Fix this
                                        // onClick={onCloseSidebar}
                                        className="group flex gap-x-3 py-3 pl-7 text-sm font-semibold"
                                    >
                                        {item.icon}
                                    </Link>
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
                                    className="mt-auto w-full flex flex-col items-center gap-x-3 bg-[#0B365F] py-8 pr-3 text-sm font-semibold leading-6 text-white"
                                >
                                    <div
                                        // className="flex gap-3 bg-gray-500 pl-10 py-2 rounded-r-xl items-center w-10/12"
                                        className={tw(
                                            item.path === currentPath
                                                ? "flex flex-col gap-4 w-full items-center rounded-r-xl bg-[#00519E] py-2 pl-5 pr-3 text-white"
                                                : "flex flex-col gap-4 w-full items-center rounded-r-xl py-2 pl-5 pr-3 text-white"
                                        )}
                                    >
                                        <button className="w-full h-full pl-1" onClick={() => navigate("/profile")}>
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
                                        </button>
                                        <button
                                            onClick={handleOpenLogOutModal}
                                            title="Logout"
                                        >
                                            {item.icon}
                                        </button>
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
        </div>
    )
}
