import { useEffect } from "react";
import { Form, getFormQuery } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { icons } from "@/ui";

export const PrepareQuestionsForm: React.FunctionComponent = () => {
    const { id } = useParams();
    // const navigate = useNavigate();
    // TODO- Error handling 404, and redirect to not found page. with navigate.
    let form: Form = {};
    const { data: formData, isLoading: isLoadingQuestsForm  } = useQuery({
        ...getFormQuery(parseInt(id!)),
        // The query will not execute until the id exists
        enabled: !!id,
    });
    form = formData!;
    
    // useEffect(() => {
    //     console.log(isError)
    //     if(!isLoadingQuestsForm && id && form===undefined){
    //         navigate("/*");
    //     } 
    // }
    // , [isLoadingQuestsForm]);
return (
        <div>
            {isLoadingQuestsForm ? (
                <tr className="h-full items-center">
                <td colSpan={5}>
                    <div className="flex justify-center p-9">
                        <icons.SpinnerIcon />
                    </div>
                </td>
            </tr>
            ) : (
                // <NewForm initialData={form} />
                <></>
            )}
        </div>
    );
}