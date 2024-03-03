import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";

import { FormInstanceScreens } from "./components";
import { getFormByPublicCodeQuery } from "@/api/forms";
import { icons } from "@/ui";
import EmptyState from "@/ui/common/EmptyState";
import { message } from "@/constants/message";

export interface FormInstanceFlow {
    questionType: number,
    currentQuestionOrder: number
};
export const InstanceForm: React.FunctionComponent = () => {
    const { publicCode } = useParams(); // publicCode is the form public code to emit.

    const { data: formInstanceData, isLoading, isFetching } = useQuery({
        ...getFormByPublicCodeQuery(publicCode),
        // The query will not execute until the id exists
        enabled: !!publicCode,
    });

    const [currentScreen, setCurrentScreen] = useState<FormInstanceFlow>({ questionType: 0, currentQuestionOrder: 1 });
    const FormInstance = FormInstanceScreens[currentScreen.questionType as 0 | 1 | 2 | 3 | 4 | 5 | 6];

    return (
        <div className="w-full">
            {isLoading || isFetching ? (
                <div className="flex h-full items-center justify-center">
                    <icons.SpinnerIcon />
                </div>
            ) : (
                <div className="flex items-center justify-center w-full">
                    {
                        !formInstanceData?.is_active ? (
                            <div className="bg-white px-10 pt-10 pb-5 rounded-lg">
                                <EmptyState message={message.INACTIVE_FORM} iconName="ExclamationCircleIcon" />
                            </div>
                        ) : (<FormInstance currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} formInstanceInfo={formInstanceData} />)
                    }
                </div>
            )}
        </div>
    );
}
