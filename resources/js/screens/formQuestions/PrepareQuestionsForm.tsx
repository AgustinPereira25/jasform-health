// import { useEffect } from "react";
import { getFormQuestionsQuery } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { icons } from "@/ui";
import { QuestionsForm } from "./FormQuestions";

export const PrepareQuestionsForm: React.FunctionComponent = () => {
    const { id } = useParams();
    // const navigate = useNavigate();
    // TODO- Error handling 404, and redirect to not found page. with navigate.
    const { data: formQtsData, isLoading: isLoadingQuestsForm } = useQuery({
        ...getFormQuestionsQuery(parseInt(id!)),
        // The query will not execute until the id exists
        enabled: !!id,
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
                <tr className="h-full items-center">
                    <td colSpan={5}>
                        <div className="flex justify-center p-9">
                            <icons.SpinnerIcon />
                        </div>
                    </td>
                </tr>
            ) : (
                <QuestionsForm initialData={formQtsData ?? []} />
            )}
        </div>
    );
}