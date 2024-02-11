import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/router";
import EmptyState from "@/ui/common/EmptyState";
import { message } from "@/constants/message";
import { Button } from "@/ui/common/Button";
import { icons } from "@/ui/common/Icons";
import { tw } from "@/utils/tw";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="relative isolate min-h-full">
            <div className="flex items-center justify-between bg-white px-2 pb-4 text-base font-semibold leading-7">
                <div className="flex items-center gap-4">
                    <Button variant="secondary" onClick={() => navigate(-1)}>
                        <icons.ArrowLeftIcon className={tw(`h-5 w-5`)} />
                        Return
                    </Button>
                    <Button variant="secondary" onClick={() => navigate(ROUTES.home)}>
                        Go Home
                    </Button>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
                <EmptyState
                    message={message.PAGE_NOT_FOUND}
                    iconName="ExclamationCircleIcon"
                />
            </div>
        </div>
    );
};
