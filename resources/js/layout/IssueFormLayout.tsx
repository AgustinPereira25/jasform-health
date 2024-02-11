import { Outlet } from "react-router-dom";
// import type { User } from "@/api";
// import { Navbar } from "./Navbar";
// import { useUserStore } from "@/stores";
// import { useEffect } from "react";

export const IssueFormLayout = () => {
    //TODO - Quit this mock user when we finish log in screen.
    // const mockUser: User = {
    //     id: 1,
    //     first_name: "John",
    //     last_name: "Doe",
    //     photo: "https://images.nightcafe.studio//assets/man-in-suit.jpg",
    //     position_in_organization: "Gerente",
    //     is_active: true,
    //     email: "abcd@fdsfsd.com",
    //     organization_id: "1",
    //     organization_name: "Organization",
    //     roles: [
    //         {
    //             "id": 1,
    //             "name": "Admin",
    //             "description": "Admin tasks"
    //         }
    //     ]
    // };

    // const { setUser } = useUserStore();

    // useEffect(() => {
    //     setUser(mockUser);
    // }, [])

    return (
        <div className="h-screen flex-col overflow-hidden bg-gradient-to-r from-[#407EC9] to-[#00519E] md:flex md:flex-row">
            <main className="flex h-full grow overflow-y-auto p-5 items-center justify-center ">
                <Outlet />
            </main>
        </div>
    );
};
