import { icons } from "@/ui";

export const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <icons.SpinnerIcon />
        </div>
    );
}
