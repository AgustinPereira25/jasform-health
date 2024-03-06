import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import type { Form } from "@/api";
import { getFormQuery } from "@/api";
import { NewForm } from "./NewForm";
import { Button, icons } from "@/ui";
import { useUserStore } from "@/stores";
import { ROUTES } from "@/router";
import { tw } from "@/utils";
import EmptyState from "@/ui/common/EmptyState";
import { message } from "@/constants/message";
import FormInfoSkeleton from "@/ui/common/Skeletons/FormInfoSkeleton";

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
    const { data: formData, isError, isLoading: isLoadingForm, isFetching } = useQuery({
        ...getFormQuery(parseInt(id!)),
        // The query will not execute until the id exists
        enabled: !!id,
        refetchOnWindowFocus: false,
    });
    form = formData!;

    // useEffect(() => {
    //     console.log(isError)
    //     if(!isLoadingForm && id && form===undefined){
    //         navigate("/*");
    //     }
    // }
    // , [isLoadingForm]);

    // return <FormInfoSkeleton />

    return (
        <div>
            {isLoadingForm || isFetching ? (
                <FormInfoSkeleton />
            ) : isError ? (
                <>
                    <div className="flex items-center justify-between bg-white px-2 pb-4 text-base font-semibold leading-7">
                        <div className="flex items-center">
                            <Button variant="secondary" onClick={() => navigate(-1)}>
                                <icons.ArrowLeftIcon className={tw(`h-5 w-5`)} />
                                Return
                            </Button>
                        </div>
                    </div>
                    <EmptyState
                        message={message.ERROR_STATE}
                        iconName="ArchiveBoxXMarkIcon"
                    />
                </>
            ) : <NewForm initialData={form} />
            }

        </div>
    );
}
