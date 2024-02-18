// import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
// import { icons } from "@/ui";
import { FormInstanceScreens } from "./components";
import type { Form } from "@/api/forms";
import { useFormInstance } from "@/stores/useFormInstance";
import type { CompletedForm } from "@/stores/useFormInstance";
import { useState } from "react";

export interface FormInstanceFlow {
    questionType: number,
    currentQuestionOrder: number
};
export const FormInstance: React.FunctionComponent = () => {
    const { auxCode } = useParams(); // id is the form id to Issue.

    // let form: Form = {};
    // const { data: formData, isLoading: isLoadingForm } = useQuery({
    //     ...getFormQuery(parseInt(id!)),
    //     // The query will not execute until the id exists
    //     enabled: !!id,
    // });
    // form = formData!;

    //TODO - Quit this mock form instance when we finish log in screen.
    const creationDateTime = new Date("2024-01-11 00:00:00");
    const lastModifiedDateTime = new Date("2024-01-12 00:00:00");
    const mockFormInstance: Form = {
        id: 1,
        name: "Form 1",
        welcome_text: "Welcome to form 1",
        description: "This is the form 1",
        creation_date_time: creationDateTime,
        last_modified_date_time: lastModifiedDateTime,
        logo: "/uploads/logo1.png",
        primary_color: "Red",
        secondary_color: "Black",
        rounded_style: "Yes",
        api_url: "",
        is_active: true,
        is_anonymous_user_answers: true,
        is_request_mandatory_initial_data: true,
        public_code: "100",
        user_id: 1,
        form_instances_count: 1,
        form_questions_count: 5,
        questions: [
            {
                id: 1,
                title: "F1-Question A",
                text: "How are you?",
                order: 1,
                is_obligatory: false,
                form_id: 1,
                question_type_id: 1,
                question_type_name: "Simple Text"
            },
            {
                id: 2,
                title: "F1-Question B",
                text: "What is happening?",
                order: 2,
                is_obligatory: false,
                form_id: 1,
                question_type_id: 2,
                question_type_name: "Input Field"
            },
            {
                id: 3,
                title: "F2-Question A",
                text: "What is happening??",
                order: 3,
                is_obligatory: false,
                form_id: 1,
                question_type_id: 2,
                question_type_name: "Input Field"
            },
            {
                id: 4,
                title: "F2-Question B",
                text: "What is happening??",
                order: 4,
                is_obligatory: false,
                form_id: 1,
                question_type_id: 4,
                question_type_name: "Single Option - Radio Button",
                questions_options: [
                    {
                        id: 1,
                        order: 1,
                        title: "Title Mock 1",
                        next_question: 1,
                        form_question_id: 1
                    },
                    {
                        id: 2,
                        order: 2,
                        title: "Title Mock 2",
                        next_question: 1,
                        form_question_id: 1
                    },
                    {
                        id: 3,
                        order: 3,
                        title: "Title Mock 3",
                        next_question: 2,
                        form_question_id: 2
                    }
                ]
            },
            {
                id: 5,
                title: "F1-Question C",
                text: "What is happening??",
                order: 5,
                is_obligatory: false,
                form_id: 1,
                question_type_id: 2,
                question_type_name: "Input Field"
            }
        ]
    };
    // useEffect(() => {
    //     console.log(isError)
    //     if(!isLoadingForm && id && form===undefined){
    //         navigate("/*");
    //     } 
    // }
    // , [isLoadingForm]);

    const [currentScreen, setCurrentScreen] = useState<FormInstanceFlow>({ questionType: 0, currentQuestionOrder: 0 });
    const FormInstance = FormInstanceScreens[currentScreen.questionType as 0 | 1 | 2 | 3 | 4 | 5 | 6];

    const initialFormData: CompletedForm = {
        form_id: mockFormInstance.id!,
        public_code: mockFormInstance.public_code!,
        final_date_time: mockFormInstance.creation_date_time!,
        completer_user_name: "",
        completer_user_last_name: "",
        completer_user_email: "",
        aux_code: auxCode ?? "",
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
        <div className="flex items-center justify-center w-full">
            <FormInstance currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} formInstanceInfo={mockFormInstance} />
        </div>
    );
}