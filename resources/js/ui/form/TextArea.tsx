import type { ComponentPropsWithoutRef, ForwardedRef, ReactNode } from "react";

import { forwardRef, tw } from "@/utils";
import { IconWrapper } from "../common";
import { Label } from "./Label";
import { Message } from "./Message";

export interface TextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
    compact?: boolean;
    containerClassName?: string;
    error?: string | boolean;
    iconClassName?: string;
    id: string;
    label?: ReactNode;
    left?: ReactNode;
    message?: string;
    fullHeight?: boolean;
    right?: ReactNode;
    className?: string;
}

export const TextArea = forwardRef(
    (
        {
            className,
            compact,
            containerClassName,
            error,
            id,
            label,
            left,
            right,
            message,
            fullHeight = false,
            ...rest
        }: TextAreaProps,
        ref: ForwardedRef<HTMLTextAreaElement>,
    ) => (
        <div className={tw("relative", containerClassName)}>
            {!!label && <Label htmlFor={id} label={label} />}
            <div
                className={tw(
                    "flex flex-row rounded-md shadow-sm items-baseline",
                    !!rest.disabled && "opacity-30",
                    fullHeight && "h-full",
                )}
            >
                {!!left && (
                    <div className="pointer-events-none absolute pl-3">
                        <IconWrapper size="sm" className="text-gray-400">
                            {left}
                        </IconWrapper>
                    </div>
                )}
                <textarea
                    ref={ref}
                    id={id}
                    {...rest}
                    className={tw(
                        "block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder:text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                        !!error && "border-red-400 focus:border-red-400 focus:ring-red-50",
                        !!left && "pl-10",
                        !!rest.disabled && "border-gray-500 bg-gray-100",
                        fullHeight && "h-full",
                        className,
                    )}
                />
                {!!right && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <IconWrapper size="sm" className="text-gray-400 h-5 w-5">
                            {right}
                        </IconWrapper>
                    </div>
                )}
            </div>
            {(!compact || !!message || !!error) && (
                <Message message={message} error={error} />
            )}
        </div>
    ),
);
