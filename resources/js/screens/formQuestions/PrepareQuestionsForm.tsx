// import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getFormQuery } from "@/api";
import { icons } from "@/ui";
import { QuestionsForm } from "./FormQuestions";
import { useUserStore } from "@/stores";
import FormQuestionsSkeleton from "@/ui/common/Skeletons/FormQuestionsSkeleton";

export const PrepareQuestionsForm: React.FunctionComponent = () => {
    const { id } = useParams();
    const { token } = useUserStore();

    // const navigate = useNavigate();
    // TODO- Error handling 404, and redirect to not found page. with navigate.
    const { data: formQtsData, isLoading: isLoadingQuestsForm } = useQuery({
        ...getFormQuery(parseInt(id!)),
        // The query will not execute until the id exists
        enabled: !!id && !!token,
    });

    // useEffect(() => {
    //     console.log(isError)
    //     if(!isLoadingQuestsForm && id && form===undefined){
    //         navigate("/*");
    //     }
    // }
    // , [isLoadingQuestsForm]);

    return (
        <div className="h-full">
            {isLoadingQuestsForm ? (
                <FormQuestionsSkeleton />
                // <tr className="h-full items-center">
                //     <td colSpan={5}>
                //         <div className="flex justify-center p-9">
                //             <icons.SpinnerIcon />
                //         </div>
                //     </td>
                // </tr>
            ) : (
                <QuestionsForm
                    initialData={formQtsData ?? {}}
                />
            )}
        </div>
    );
}
