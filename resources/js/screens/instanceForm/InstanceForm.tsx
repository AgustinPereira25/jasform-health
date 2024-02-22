import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";

import { FormInstanceScreens } from "./components";
import { getFormByPublicCodeQuery } from "@/api/forms";
import { icons } from "@/ui";

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

    const [currentScreen, setCurrentScreen] = useState<FormInstanceFlow>({ questionType: 0, currentQuestionOrder: 0 });
    const FormInstance = FormInstanceScreens[currentScreen.questionType as 0 | 1 | 2 | 3 | 4 | 5 | 6];

    return (
        <div className="w-full">
            {isLoading || isFetching ? (
                <tr className="h-full items-center">
                    <td colSpan={5}>
                        <div className="flex justify-center p-9">
                            <icons.SpinnerIcon />
                        </div>
                    </td>
                </tr>
            ) : (
                <div className="flex items-center justify-center w-full">
                    <FormInstance currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} formInstanceInfo={formInstanceData![0]!} />
                </div>
            )}
        </div>
    );
}