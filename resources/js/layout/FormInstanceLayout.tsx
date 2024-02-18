import { Outlet } from "react-router-dom";
// import type { User } from "@/api";
// import { Navbar } from "./Navbar";
// import { useUserStore } from "@/stores";
// import { useEffect } from "react";

export const FormInstanceLayout = () => {

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
