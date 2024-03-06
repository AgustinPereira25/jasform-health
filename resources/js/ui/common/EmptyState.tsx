import { icons } from "./Icons";

interface EmptyStateProps {
    message: string;
    iconName?: keyof typeof icons;
}

const EmptyState = ({ message, iconName }: EmptyStateProps) => {
    let Icon = null;

    if (iconName && iconName in icons) {
        Icon = icons[iconName];
    }

    return (
        <div className="flex flex-col items-center justify-center mb-5">
            {Icon && <Icon className="mb-4 h-8" />}
            <div className="text-center">
                {message}
            </div>
        </div>
    );
};

export default EmptyState;
