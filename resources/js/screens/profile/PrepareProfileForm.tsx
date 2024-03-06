import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import type { User } from "@/api";
import { getUserQuery } from "@/api";
import { NewEditProfile } from "./NewEditProfile";
import { icons, Button } from "@/ui";
import { tw } from "@/utils";
import UserProfileSkeleton from "@/ui/common/Skeletons/UserProfileSkeleton";
import EmptyState from "@/ui/common/EmptyState";
import { message } from "@/constants/message";
import { useUserStore } from "@/stores";
import { ROUTES } from "@/router";

export const PrepareProfileForm: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const { token } = useUserStore();
    useEffect(() => {
        if (!token) {
            navigate(ROUTES.login);
        }
    }, []);

    const { id } = useParams();
    // TODO- Error handling 404, and redirect to not found page. with navigate.
    let user: User = {};
    const { data: userData, isError, isLoading: isLoadingUser, isFetching } = useQuery({
        ...getUserQuery(parseInt(id!)),
        // The query will not execute until the id exists
        enabled: !!id && !!token,
        refetchOnWindowFocus: false,
    });
    user = userData!;

    // useEffect(() => {
    //     console.log(isError)
    //     if(!isLoadingUser && id && userData===undefined){
    //         navigate("/*");
    //     }
    // }
    // , [isLoadingUser]);

    return (
        <div>
            {isLoadingUser || isFetching ? (
                <UserProfileSkeleton />
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
            ) : <NewEditProfile initialData={user} />
            }
        </div>
    );
}
