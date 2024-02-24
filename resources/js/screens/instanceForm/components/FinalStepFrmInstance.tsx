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

export const FinalStepFrmInstance: React.FC<InstanceProps> = ({ formInstanceInfo, currentScreen, setCurrentScreen }) => {
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
            <div id="final-step-container-form-div" className="bg-gray-300 p-10 border rounded-xl flex flex-col justify-between items-center max-w-screen-sm h-full max-h-[430px] gap-7">
                <span className="text-3xl font-semibold">Gracias por completar este formulario</span>
                <div className="flex flex-col gap-5 w-[70%]">
                    <span className="text-xl font-light text break-words">Tus respuestas fueron correctamente comunicadas con tu centro de salud pertinente.</span>
                    <span className="text-xl font-light text break-words">Puedes descargar tus respuestas con el “DESCARGAR” debajo.</span>
                </div>
                <div className="flex flex-col gap-7 items-center">
                    <div>
                        <Button variant="primary" type="button" id="final-step-goBack-answer-btn" className="italic" onClick={handleGoBackClick}>Atrás</Button>
                    </div>
                    <div>
                        <Button onClick={handleFinishClick} variant="secondary" type="button" id="final-step-close-window-btn">Cerrar esta ventana</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
