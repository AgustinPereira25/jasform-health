import { Button } from '@/ui'
import type { InstanceProps } from '.'
// import { useFormInstance } from '@/stores/useFormInstance';

export const FinalStepFrmInstance: React.FC<InstanceProps> = ({ formInstanceInfo, currentScreen, setCurrentScreen }) => {
    // const currentState = useFormInstance.getState().formInstance!;

    const handleGoBackClick = () => {
        const nextQuestionType: number = formInstanceInfo.questions?.find((question) => question.order === currentScreen.currentQuestionOrder - 1)?.question_type_id ?? 0;
        setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder - 1 });
    }
    return (
        <div id='final-step-container-form-div' className='bg-gray-300 p-10 border rounded-xl flex flex-col justify-between items-center max-w-screen-sm h-full max-h-[430px] gap-7'>
            <span className='text-3xl font-semibold'>Gracias por completar este formulario</span>
            <div className='flex flex-col gap-5 w-[70%]'>
                <span className='text-xl font-light text break-words'>Tus respuestas fueron correctamente comunicadas con tu centro de salud pertinente.</span>
                <span className='text-xl font-light text break-words'>Puedes descargar tus respuestas con el “DESCARGAR” debajo.</span>
            </div>
            <div className='flex flex-col gap-7 items-center'>
                {/* <div>
                    <Button variant="primary" type="submit" id="final-step-submit-answer-btn" className='italic'>DESCARGAR</Button>
                </div> */}
                <div>
                    <Button variant="primary" type="button" id="final-step-goBack-answer-btn" className='italic' onClick={handleGoBackClick}>Atrás</Button>
                </div>
                <div>
                    <Button variant="secondary" type="button" id="final-step-close-window-btn">Cerrar esta ventana</Button>
                </div>
            </div>
        </div>
    )
}
