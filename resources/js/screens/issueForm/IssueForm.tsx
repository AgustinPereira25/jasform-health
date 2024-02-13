// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
// import { icons } from "@/ui";
import { IssueFormScreens } from "./components";

export const IssueForm: React.FunctionComponent = () => {
    // const { id } = useParams(); // id is the form id to Issue.

    // let form: Form = {};
    // const { data: formData, isLoading: isLoadingForm } = useQuery({
    //     ...getFormQuery(parseInt(id!)),
    //     // The query will not execute until the id exists
    //     enabled: !!id,
    // });
    // form = formData!;

    // useEffect(() => {
    //     console.log(isError)
    //     if(!isLoadingForm && id && form===undefined){
    //         navigate("/*");
    //     } 
    // }
    // , [isLoadingForm]);

    const IssueForm = IssueFormScreens[0];

    // TODO - Make similar structure like PrepareQuestionsForm with isLoading, etc.
    return (
        <div className="flex items-center justify-center">
            <IssueForm />
        </div>
    );
}