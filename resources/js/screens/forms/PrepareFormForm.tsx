import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import type { Form } from "@/api";
import { getFormQuery } from "@/api";
import { NewForm } from "./NewForm";
import { icons } from "@/ui";
import { useUserStore } from "@/stores";
import { ROUTES } from "@/router";

export const PrepareFormForm: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const { token } = useUserStore();
    useEffect(() => {
        if (!token) {
            navigate(ROUTES.login);
        }
    }, []);

    const { id } = useParams();
    // const navigate = useNavigate();
    // TODO- Error handling 404, and redirect to not found page. with navigate.
    let form: Form = {};
    const { data: formData, isLoading: isLoadingForm } = useQuery({
        ...getFormQuery(parseInt(id!)),
        // The query will not execute until the id exists
        enabled: !!id,
    });
    form = formData!;

    // useEffect(() => {
    //     console.log(isError)
    //     if(!isLoadingForm && id && form===undefined){
    //         navigate("/*");
    //     }
    // }
    // , [isLoadingForm]);
    return (
        <div>
            {isLoadingForm ? (
                <tr className="h-full items-center">
                    <td colSpan={5}>
                        <div className="flex justify-center p-9">
                            <icons.SpinnerIcon />
                        </div>
                    </td>
                </tr>
            ) : (
                <NewForm initialData={form} />
            )}
        </div>
    );
}
