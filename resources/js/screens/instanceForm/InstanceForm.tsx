import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { FormInstanceScreens } from "./components";
import { getFormByPublicCodeQuery } from "@/api/forms";
import { Button, icons } from "@/ui";
import EmptyState from "@/ui/common/EmptyState";
import { message } from "@/constants/message";
import { tw } from '@/utils';
import { ROUTES } from "@/router";
export interface FormInstanceFlow {
    questionType: number,
    currentQuestionOrder: number
};
export const InstanceForm: React.FunctionComponent = () => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    };

    const navigate = useNavigate();
    const { publicCode } = useParams(); // publicCode is the form public code to emit.

    const { data: formInstanceData, isLoading, isFetching, error } = useQuery({
        ...getFormByPublicCodeQuery(publicCode),
        // The query will not execute until the id exists
        enabled: !!publicCode,
        refetchOnWindowFocus: false,
    });

    const [currentScreen, setCurrentScreen] = useState<FormInstanceFlow>({ questionType: 0, currentQuestionOrder: 1 });
    const FormInstance = FormInstanceScreens[currentScreen.questionType as 0 | 1 | 2 | 3 | 4 | 5 | 6];

    return (
        <div className="w-full h-full">
            {isLoading || isFetching ? (
                <div className="flex h-full items-center justify-center">
                    <icons.SpinnerIcon />
                </div>
            ) : (
                <div className="flex items-center justify-center w-full h-full">
                    {
                        !formInstanceData?.is_active ? (
                            <div className="max-w-[25%] bg-white px-10 pt-10 pb-5 rounded-lg flex flex-col justify-center">
                                <EmptyState message={error ? message.INVALID_PUBLIC_CODE : message.INACTIVE_FORM} iconName={error ? "ArchiveBoxXMarkIcon" : "ExclamationCircleIcon"} />
                                <Button
                                    className="w-1/2 mx-auto "
                                    variant="secondary"
                                    onClick={() => navigate(ROUTES.publicCode)}
                                >
                                    <icons.ArrowLeftIcon className={tw(`w-5 h-5`)} />
                                    Return
                                </Button>
                            </div>
                        ) : (<FormInstance currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} formInstanceInfo={formInstanceData} />)
                    }
                </div>
            )
            }
        </div >
    );
}
