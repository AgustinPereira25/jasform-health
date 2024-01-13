import { useEffect } from "react";
import { User, getUserQuery } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { NewProfile } from "./NewProfile";
import { icons } from "@/ui";

export const PrepareProfileForm: React.FunctionComponent = () => {
    const { id } = useParams();
    // const navigate = useNavigate();
    // TODO- Error handling 404, and redirect to not found page. with navigate.
    let user: User = {};
    const { data: userData, isLoading: isLoadingUser  } = useQuery({
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
            {isLoadingUser ? (
                <tr className="h-full items-center">
                <td colSpan={5}>
                    <div className="flex justify-center p-9">
                        <icons.SpinnerIcon />
                    </div>
                </td>
            </tr>
            ) : (
                <NewProfile initialData={user} />
            )}
        </div>
    );
}