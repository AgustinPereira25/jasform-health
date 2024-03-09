import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { Button, LoadingOverlay, Tooltip, icons } from '@/ui'
import type { InstanceProps } from '.'
import { useFormInstance } from '@/stores/useFormInstance';
import type { IHttpResponseError } from '@/api';
// import type { FormInstanceURL } from '@/api/formInstance';
import { createFormInstance } from '@/api/formInstance';
import { getColorContrast } from '@/helpers/helpers';
import { message } from '@/constants/message';

export const ConfirmationStepFrmInstance: React.FC<InstanceProps> = ({ formInstanceInfo, currentScreen, setCurrentScreen }) => {
    let currentState = useFormInstance.getState().formInstance!;
    const previewMode = useFormInstance.getState().previewMode ?? false;
    const navigate = useNavigate();
    console.log('currentState', currentState);
    const handleFinishClick = () => {
        if (!previewMode) {
            useFormInstance.setState({ formInstance: { ...currentState, final_date_time: new Date, completed_questions_count: currentState.completed_questions.length } });
            currentState = useFormInstance.getState().formInstance!;

            // Delete flag used to determinate if a question is completed or not. (Form modal confirmation.)
            currentState.completed_questions.forEach((question) => {
                delete question.is_completed;
            });

            console.log("currentState:", currentState);
            createFormInstanceMutation(currentState);
            // if (currentState.api_url) {
            //     console.log("currentState.api_url:", currentState.api_url)
            //     const currentURLAndBody: FormInstanceURL = {
            //         url: currentState.api_url,
            //         body: currentState,
            //     }
            //     sendExternalEndpointMutation(currentURLAndBody);
            // }
        }
    }

    const handleGoBackClick = () => {
        const nextQuestionType: number = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder - 1)?.question_type_id ?? 0;
        setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder - 1 });
    }

    const handleGoCompletedQuestionClick = (gridSelectedQuestionTypeId: number, gridSelectedQuestionOrder: number) => {
        setCurrentScreen({ questionType: gridSelectedQuestionTypeId, currentQuestionOrder: gridSelectedQuestionOrder });
    }

    const queryClient = useQueryClient();
    const { mutate: createFormInstanceMutation, isPending: isPendingCreateFormInstanceMutation } =
        useMutation({
            mutationFn: createFormInstance.mutation,
            onSuccess: () => {
                createFormInstance.invalidates(queryClient);
                toast.success(`Form successfully sent!`);
                navigate(`/instance-form/${currentState.public_code}/finished`);
            },
            onError: (err: IHttpResponseError) => {
                if (err?.response?.data?.message) {
                    toast.error(err?.response.data.message);
                } else if (err?.response?.data?.error?.fields) {
                    const errors = err?.response.data.error.fields;
                    Object.entries(errors).forEach(([_, valArray]) => {
                        toast.error(`${valArray[0]}`);
                    });
                } else {
                    toast.error("There was an error. Please try again later.");
                }
            },
        });

    // const { mutate: sendExternalEndpointMutation } =
    //     useMutation({
    //         mutationFn: sendExternalEndpoint.mutation,
    //         onSuccess: () => {
    //             sendExternalEndpoint.invalidates(queryClient);
    //             toast.success(`Data successfully sent to external integration!`);
    //             navigate(`/instance-form/${currentState.public_code}/finished`);
    //         },
    //         onError: (err: IHttpResponseError) => {
    //             if (err?.response?.data?.message) {
    //                 toast.error(err?.response.data.message);
    //             } else if (err?.response?.data?.error?.fields) {
    //                 const errors = err?.response.data.error.fields;
    //                 Object.entries(errors).forEach(([_, valArray]) => {
    //                     toast.error(`${valArray[0]}`);
    //                 });
    //             } else {
    //                 toast.error("There was an error. Please try again later.");
    //             }
    //         },
    //     });

    return (
        <>
            {(isPendingCreateFormInstanceMutation || isPendingCreateFormInstanceMutation) && (
                <LoadingOverlay />
            )}
            <div id="final-step-container-form-div" className="bg-white p-7 border rounded-xl flex flex-col justify-between items-center max-w-[650px] h-full max-h-[650px] gap-3">
                <span className="text-2xl font-semibold">About to submit the form</span>
                <div className="flex flex-col gap-3">
                    <span className="text-lg font-light text break-words">{formInstanceInfo.final_text}</span>
                    <span className="text-lg font-light text break-words">Click in &ldquo;Finish & Send&ldquo; button to complete and send the form.</span>
                </div>

                <div className="rounded-xl border-[1px] bg-white shadow-lg max-h-64 overflow-scroll">
                    <div className="rounded-sm border-[1px] border-gray-300">
                        <table className="whitespace-normal bg-white text-left shadow-md">
                            <colgroup>
                                <col className="w-1/12" />
                                <col className="w-2/12" />
                                <col className="w-2/12" />
                                <col className="w-[9%]" />
                            </colgroup>
                            <thead className="border-b-[1px] border-gray-300 bg-gray-200 text-xs leading-6">
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-1 pl-4 pr-4 font-normal text-[#6B7280] sm:pl-6 lg:pl-6"
                                    >
                                        QUESTION
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden py-1 pl-0 pr-8 font-normal text-[#6B7280] sm:table-cell"
                                    >
                                        TYPE
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-1 pl-0 pr-4 text-right font-normal text-[#6B7280] sm:pr-4 sm:text-left lg:pr-3"
                                    >
                                        ANSWER
                                    </th>
                                    <th
                                        scope="col"
                                        className="flex justify-center py-1 pl-0 pr-4 font-normal text-[#6B7280] md:table-cell lg:pr-3"
                                    >
                                        GO TO
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-xs">
                                {currentState.completed_questions?.filter((item) => item.question_type_id !== 1).map((item) => (
                                    <tr key={item.id} className="font-normal">
                                        <td className="py-2 pl-4 pr-4 sm:pl-6 lg:pl-6">
                                            <div className="flex items-center gap-x-4">
                                                <div className="whitespace-normal leading-4 text-black">
                                                    {item.text}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-normal py-2 pl-0 pr-4 sm:table-cell sm:pr-4">
                                            <div className="flex gap-x-3">
                                                <div className="whitespace-normal leading-4 text-black">
                                                    {item.question_type_name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-normal py-2 pl-0 pr-4 leading-4 text-[#6B7280] md:table-cell lg:pr-3">
                                            {item.question_type_id === 3 ? item.completer_user_answer_checked_options?.map((option) => option.title).join("; ") : item.answer}
                                        </td>
                                        <td className="flex items-center justify-center whitespace-normal py-2 pl-0 pr-4 leading-4 text-[#6B7280] sm:pr-1 lg:pr-3 cursor-pointer">
                                            <icons.ChevronRightIcon className="w-5 h-5 text-[#00519E]" onClick={() => handleGoCompletedQuestionClick(item.question_type_id, item.order)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex w-full gap-7 justify-between items-center pt-4">
                    <div>
                        <Tooltip
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            content={message.TOOLTIP_FINISH_FORM_BACK} className="text-nowrap"
                        >
                            <Button variant="secondary" type="button" id="goBack-answer-btn" onClick={handleGoBackClick} style={{
                                backgroundColor: formInstanceInfo.secondary_color,
                                border: formInstanceInfo.rounded_style ? 1 : 'none',
                                borderRadius: formInstanceInfo.rounded_style ?? 'none',
                                color: getColorContrast(formInstanceInfo.secondary_color),
                                // borderColor: primaryColor.startsWith("#e") || primaryColor.startsWith("#fff") ? 'black' : 'white',
                            }}
                            >
                                Back
                            </Button>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            content={message.TOOLTIP_FINISH_FORM_SEND}
                            className="text-nowrap"
                            placement="left"
                        >
                            <Button onClick={handleFinishClick} variant="primary" type="button" id="final-step-close-window-btn"
                                style={{
                                    backgroundColor: formInstanceInfo.primary_color,
                                    border: formInstanceInfo.rounded_style ? 1 : 'none',
                                    borderRadius: formInstanceInfo.rounded_style ?? 'none',
                                    color: getColorContrast(formInstanceInfo.primary_color),
                                }}
                            >
                                Finish & Send
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </>
    )
}
