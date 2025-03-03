import type { ComponentPropsWithoutRef } from "react";

import type { User } from "./api";
import type { navigation } from "./layout/Navbar/Sidebar";

export type SVGProps = ComponentPropsWithoutRef<"svg">;

export interface ModalProps {
  show: boolean;
  onClose: () => void;
}

export interface FormDropdownItem {
  name: string;
  icon: React.ReactNode;
  href?: string;
  newSection?: boolean;
}

export interface MenuBarProps {
    user: User | null;
    logOutMutation: () => void;
    isPendingLogOutUserMutation: boolean;
    currentPath: string;
    navigation: typeof navigation;
    closeNavbar: () => void;
}
