import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";

import { FormInstanceScreens } from "./components";
import { getFormByPublicCodeQuery } from "@/api/forms";
import type { Form } from "@/api/forms";
import { useFormInstance } from "@/stores/useFormInstance";
import type { CompletedForm } from "@/stores/useFormInstance";
import { icons } from "@/ui";

export interface FormInstanceFlow {
    questionType: number,
    currentQuestionOrder: number
};
export const FormInstance: React.FunctionComponent = () => {
    const { publicCode } = useParams(); // publicCode is the form public code to emit.

    let formInstanceInfo: Form = {};
    const { data: formInstanceData, isLoading, isFetching } = useQuery({
        ...getFormByPublicCodeQuery(publicCode),
        // The query will not execute until the id exists
        enabled: !!publicCode,
    });
    formInstanceInfo = formInstanceData!;
    // console.log(formInstanceInfo)

    //TODO - Quit this mock form instance when we finish log in screen.
    // const creationDateTime = new Date("2024-01-11 00:00:00");
    // const lastModifiedDateTime = new Date("2024-01-12 00:00:00");
    // const mockFormInstance: Form = {
    //     id: 1,
    //     name: "Form 1",
    //     welcome_text: "Welcome to form 1",
    //     description: "This is the form 1",
    //     creation_date_time: creationDateTime,
    //     last_modified_date_time: lastModifiedDateTime,
    //     logo: "/uploads/logo1.png",
    //     primary_color: "Red",
    //     secondary_color: "Black",
    //     rounded_style: "Yes",
    //     api_url: "",
    //     is_active: true,
    //     is_user_responses_linked: true,
    //     is_initial_data_required: true,
    //     public_code: "100",
    //     user_id: 1,
    //     form_instances_count: 1,
    //     form_questions_count: 5,
    //     questions: [
    //         {
    //             id: 1,
    //             title: "F1-Question A",
    //             text: "How are you?",
    //             order: 1,
    //             is_obligatory: false,
    //             form_id: 1,
    //             question_type_id: 1,
    //             question_type_name: "Simple Text"
    //         },
    //         {
    //             id: 2,
    //             title: "F1-Question B",
    //             text: "What is happening?",
    //             order: 2,
    //             is_obligatory: false,
    //             form_id: 1,
    //             question_type_id: 2,
    //             question_type_name: "Input Field"
    //         },
    //         {
    //             id: 3,
    //             title: "F2-Question A",
    //             text: "What is happening??",
    //             order: 3,
    //             is_obligatory: false,
    //             form_id: 1,
    //             question_type_id: 2,
    //             question_type_name: "Input Field"
    //         },
    //         {
    //             id: 4,
    //             title: "F2-Question B",
    //             text: "What is happening??",
    //             order: 4,
    //             is_obligatory: false,
    //             form_id: 1,
    //             question_type_id: 4,
    //             question_type_name: "Single Option - Radio Button",
    //             questions_options: [
    //                 {
    //                     id: 1,
    //                     order: 1,
    //                     title: "Title Mock 1",
    //                     next_question: 1,
    //                     form_question_id: 1
    //                 },
    //                 {
    //                     id: 2,
    //                     order: 2,
    //                     title: "Title Mock 2",
    //                     next_question: 1,
    //                     form_question_id: 1
    //                 },
    //                 {
    //                     id: 3,
    //                     order: 3,
    //                     title: "Title Mock 3",
    //                     next_question: 2,
    //                     form_question_id: 2
    //                 }
    //             ]
    //         },
    //         {
    //             id: 5,
    //             title: "F1-Question C",
    //             text: "What is happening??",
    //             order: 5,
    //             is_obligatory: false,
    //             form_id: 1,
    //             question_type_id: 2,
    //             question_type_name: "Input Field"
    //         },
    //         {
    //             id: 6,
    //             title: "F2-Checkbox",
    //             text: "What is Checkbox??",
    //             order: 6,
    //             is_obligatory: true,
    //             form_id: 1,
    //             question_type_id: 3,
    //             question_type_name: "Multiple Choice - Check Box",
    //             questions_options: [
    //                 {
    //                     id: 1,
    //                     order: 1,
    //                     title: "Check Mock 1",
    //                     next_question: 1,
    //                     form_question_id: 1
    //                 },
    //                 {
    //                     id: 2,
    //                     order: 2,
    //                     title: "Check Mock 2",
    //                     next_question: 1,
    //                     form_question_id: 1
    //                 },
    //                 {
    //                     id: 3,
    //                     order: 3,
    //                     title: "Check Mock 3",
    //                     next_question: 2,
    //                     form_question_id: 2
    //                 }
    //             ]
    //         },
    //     ]
    // };

    // useEffect(() => {
    //     console.log(isError)
    //     if(!isLoadingForm && id && form===undefined){
    //         navigate("/*");
    //     }
    // }
    // , [isLoadingForm]);

    const [currentScreen, setCurrentScreen] = useState<FormInstanceFlow>({ questionType: 0, currentQuestionOrder: 0 });
    const FormInstance = FormInstanceScreens[currentScreen.questionType as 0 | 1 | 2 | 3 | 4 | 5 | 6];

    // const initialFormData: CompletedForm = {
    //     form_id: mockFormInstance.id!,
    //     final_date_time: mockFormInstance.creation_date_time!,
    //     completer_user_name: "",
    //     completer_user_last_name: "",
    //     completer_user_email: "",
    //     public_code: mockFormInstance.public_code!,
    //     completed_questions: [],
    // };

    const initialFormData: CompletedForm = {
        form_id: formInstanceInfo.id!,
        final_date_time: formInstanceInfo.creation_date_time!,
        completer_user_name: "",
        completer_user_last_name: "",
        completer_user_email: "",
        public_code: formInstanceInfo.public_code!,
        completed_questions: [],
    };

    const { formInstance } = useFormInstance();
    if (!formInstance) {
        useFormInstance.setState({
            formInstance: initialFormData,
        })
    }
    //     const currentState = useFormInstance.getState().formInstance!;
    //     useFormInstance.setState({
    //         formInstance: {
    //             ...currentState
    //             , completed_questions: [...currentState.completed_questions, {
    //                 id: 1,
    //                 title: "F1-Question A",
    //                 completer_user_answer: "abcTextFromUserAnswer",
    //                 text: "How are you?",
    //                 order: 1,
    //                 is_obligatory: false,
    //                 question_type_id: 1,
    //                 question_type_name: "Simple Text",
    //             },]
    //         }
    //     });
    // }
    // console.log(formInstance);

    // TODO - Make similar structure like PrepareQuestionsForm with isLoading, etc.
    return (
        <div>
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
                    <FormInstance currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} formInstanceInfo={formInstanceInfo} />
                </div>
            )}
        </div>
    );
}