// eslint-disable-next-line import/order
import { Outlet } from "react-router-dom";

// import type { User } from "@/api";
import { Tooltip } from "flowbite-react";

import { Navbar } from "./Navbar";
import { icons } from "@/ui";
// import { useUserStore } from "@/stores";

export const Layout = () => {
    return (
        <div className="h-screen flex-col overflow-hidden bg-white md:flex md:flex-row">
            <div className="absolute z-50">
                <Navbar />
                <div className="fixed bottom-0 right-0 m-3">
                    <Tooltip
                        content={"Need help? Go to Documentation"} className="text-nowrap w-64"
                    >
                        <a href="Https://jasform.com/docs" target="_blank" rel="noopener noreferrer" title="Need help? Go to Documentation">
                            <icons.QuestionMarkCircleIcon className="h-6 w-6 text-primary hover:text-secondary" />
                        </a>
                    </Tooltip>
                </div>
            </div>

            <main className="h-full ml-[80px] grow overflow-y-auto p-5">
                <Outlet />
            </main>
        </div>
    );
};
