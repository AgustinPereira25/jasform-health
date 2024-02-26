import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { Button, LoadingOverlay } from '@/ui'
import type { InstanceProps } from '.'
import { useFormInstance } from '@/stores/useFormInstance';
import type { IHttpResponseError } from '@/api';
import type { FormInstanceURL } from '@/api/formInstance';
import { createFormInstance, sendExternalEndpoint } from '@/api/formInstance';
import { ROUTES } from '@/router';

export const ConfirmationStepFrmInstance: React.FC<InstanceProps> = ({ formInstanceInfo, currentScreen, setCurrentScreen }) => {
    let currentState = useFormInstance.getState().formInstance!;
    const navigate = useNavigate();

    const handleFinishClick = () => {
        useFormInstance.setState({ formInstance: { ...currentState, final_date_time: new Date, completed_questions_count: currentState.completed_questions.length } });
        currentState = useFormInstance.getState().formInstance!;
        console.log("currentState:", currentState);
        createFormInstanceMutation(currentState);
        if (currentState.api_url) {
            console.log("currentState.api_url:", currentState.api_url)
            //TODO: crear otro use mutate y enviar la data al endpint de la url.
            const currentURLAndBody: FormInstanceURL = {
                url: currentState.api_url,
                body: currentState,
            }
            sendExternalEndpointMutation(currentURLAndBody);
        }
    }

    const handleGoBackClick = () => {
        const nextQuestionType: number = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder - 1)?.question_type_id ?? 0;
        setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder - 1 });
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

    const { mutate: sendExternalEndpointMutation } =
        useMutation({
            mutationFn: sendExternalEndpoint.mutation,
            onSuccess: () => {
                sendExternalEndpoint.invalidates(queryClient);
                toast.success(`Form successfully sent!`);
                navigate(ROUTES.home);
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
    return (
        <>
            {(isPendingCreateFormInstanceMutation || isPendingCreateFormInstanceMutation) && (
                <LoadingOverlay />
            )}
            <div id="final-step-container-form-div" className="bg-white p-10 border rounded-xl flex flex-col justify-between items-center max-w-screen-sm h-full max-h-[430px] gap-7">
                <span className="text-3xl font-semibold">A punto de enviar el formulario</span>
                <div className="flex flex-col gap-5 w-[70%]">
                    <span className="text-xl font-light text break-words">Tus respuestas serán enviadas a tu centro de salud pertinente.</span>
                    <span className="text-xl font-light text break-words">Haz click en “Finalizar y Enviar” para completar y enviar el formulario.</span>
                </div>
                <div className="flex flex-col gap-7 items-center">
                    <div>
                        <Button onClick={handleFinishClick} variant="primary" type="button" id="final-step-close-window-btn"
                            style={{
                                backgroundColor: formInstanceInfo.primary_color,
                                border: formInstanceInfo.rounded_style ? 1 : 'none',
                                borderRadius: formInstanceInfo.rounded_style ?? 'none',
                                color: formInstanceInfo.primary_color ? formInstanceInfo.primary_color.startsWith("#e") || formInstanceInfo.primary_color.startsWith("#f") ? 'black' : 'white' : 'black',
                            }}
                        >
                            Finalizar y Enviar
                        </Button>
                    </div>
                    <div>
                        <Button variant="secondary" type="button" id="goBack-answer-btn" onClick={handleGoBackClick} style={{
                            backgroundColor: formInstanceInfo.secondary_color,
                            border: formInstanceInfo.rounded_style ? 1 : 'none',
                            borderRadius: formInstanceInfo.rounded_style ?? 'none',
                            color: formInstanceInfo.secondary_color ? formInstanceInfo.secondary_color.startsWith("#e") || formInstanceInfo.secondary_color.startsWith("#f") ? 'black' : 'white' : 'black',
                            // borderColor: primaryColor.startsWith("#e") || primaryColor.startsWith("#fff") ? 'black' : 'white',
                        }}
                        >
                            Volver
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
