import { Outlet } from "react-router-dom";

import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    <div className="h-screen flex-col overflow-hidden bg-white md:flex md:flex-row">
      <Navbar />
      <main className="h-full grow overflow-y-auto p-5">
        <Outlet />
      </main>
    </div>
  );
};
