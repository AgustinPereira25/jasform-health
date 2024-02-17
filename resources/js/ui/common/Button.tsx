import type { ComponentPropsWithoutRef, ForwardedRef } from "react";

import { forwardRef, tw } from "@/utils";

const BUTTON_VARIANT = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    OUTLINE: "outline",
    TERTIARY: "tertiary",
} as const;
type ButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];

const SIZE = {
    SMALL: "sm",
    MEDIUM: "md",
    LARGE: "lg",
} as const;
type Size = (typeof SIZE)[keyof typeof SIZE];

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
    variant?: ButtonVariant;
    size?: Size;
}

export const Button = forwardRef(
    (
        {
            type = "button",
            className,
            variant = "primary",
            size = "md",
            disabled = false,
            children,
            ...props
        }: ButtonProps,
        ref: ForwardedRef<HTMLButtonElement>,
    ) => (
        <button
            ref={ref}
            type={type}
            className={tw(
                "flex items-center justify-center gap-2 rounded-md border border-transparent font-medium focus:outline-none focus:ring focus:ring-blue-500",

                !disabled && [
                    variant === BUTTON_VARIANT.PRIMARY &&
                    "bg-[#407EC9] text-white hover:bg-[rgb(65,107,158)] transition-all ease-in-out duration-300",
                    variant === BUTTON_VARIANT.SECONDARY &&
                    "bg-transparent text-black hover:bg-gray-100 border-gray-400 transition-all ease-in-out duration-300",
                    variant === BUTTON_VARIANT.OUTLINE &&
                    "border-gray-300 text-gray-300 hover:border-gray-400 hover:text-gray-800 transition-all ease-in-out duration-300",
                    variant === BUTTON_VARIANT.TERTIARY &&
                    "font-normal text-white hover:text-white bg-[#FF8583] hover:bg-[#d87270] transition-all ease-in-out duration-300",
                ],

                disabled && [
                    variant === BUTTON_VARIANT.PRIMARY && "bg-gray-300 text-gray-500",
                    variant === BUTTON_VARIANT.SECONDARY && "bg-gray-300",
                    variant === BUTTON_VARIANT.OUTLINE && "border-gray-300 text-gray-300",
                    variant === BUTTON_VARIANT.TERTIARY && "text-gray-300",
                ],

                size === SIZE.SMALL &&
                "rounded px-3 py-2 text-xs leading-none tracking-wider",
                size === SIZE.MEDIUM && "px-4 py-2 text-sm",
                size === SIZE.LARGE && "px-7 py-4 text-lg leading-[22px]",

                className,
            )}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    ),
);
