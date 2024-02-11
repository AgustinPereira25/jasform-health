import { Outlet } from "react-router-dom";
import type { User } from "@/api";
import { Navbar } from "./Navbar";
import { useUserStore } from "@/stores";
import { useEffect } from "react";

export const Layout = () => {
    //TODO - Quit this mock user when we finish log in screen.
    const mockUser: User = {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        photo: "https://images.nightcafe.studio//assets/man-in-suit.jpg",
        position_in_organization: "Manager",
        is_active: true,
        email: "jdoe@medicall.com",
        organization_id: "1",
        organization_name: "MediCall",
        role_name: "Admin",
    };

    const { setUser } = useUserStore();

    useEffect(() => {
        setUser(mockUser);
    }, [])

    return (
        <div className="h-screen flex-col overflow-hidden bg-white md:flex md:flex-row">
            <Navbar />
            <main className="h-full grow overflow-y-auto p-5">
                <Outlet />
            </main>
        </div>
    );
};
