import type { ReactNode } from "react";
import { Tooltip as FlowbiteTooltip } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';

interface TooltipProps {
    content: string,
    children: ReactNode,
    className?: string
}

const customTheme: CustomFlowbiteTheme['tooltip'] = {
    arrow: {
        "base": "absolute z-10 h-2 w-4 rotate-45",
        "style": {
            "dark": "bg-gray-900 dark:bg-gray-700",
            "light": "bg-white",
            "auto": "bg-white dark:bg-gray-700"
        },
        "placement": "-4px"
    }
};
function Tooltip({ content, children, className = '' }: TooltipProps) {
    return (
        <FlowbiteTooltip theme={customTheme} placement="right" style="light" animation="duration-1000" arrow={true} content={content} className={`z-10 ${className}`}>
            {children}
        </FlowbiteTooltip>
    )
}
export { Tooltip }
