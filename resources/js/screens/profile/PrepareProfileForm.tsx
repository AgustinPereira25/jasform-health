import type { User } from "@/api";
import { getUserQuery } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { NewProfile } from "./NewProfile";
import { icons } from "@/ui";
import UserProfileSkeleton from "@/ui/common/Skeletons/UserProfileSkeleton";

export const PrepareProfileForm: React.FunctionComponent = () => {
    const { id } = useParams();
    // const navigate = useNavigate();
    // TODO- Error handling 404, and redirect to not found page. with navigate.
    let user: User = {};
    const { data: userData, isError, isLoading: isLoadingUser } = useQuery({
        ...getUserQuery(parseInt(id!)),
        // The query will not execute until the id exists
        enabled: !!id,
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


            {/* {isLoadingUser ? (
                <UserProfileSkeleton />
            ) : isError ? (
                <EmptyState
                    message={message.ERROR_STATE}
                    iconName="ArchiveBoxXMarkIcon"
                />
                ) : <NewProfile initialData={user} />
            )} */}





            {isLoadingUser ? (
                <UserProfileSkeleton />
            ) : (
                <NewProfile initialData={user} />
            )}
        </div>
    );
}
