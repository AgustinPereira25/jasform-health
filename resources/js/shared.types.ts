import type { ComponentPropsWithoutRef } from "react";

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
