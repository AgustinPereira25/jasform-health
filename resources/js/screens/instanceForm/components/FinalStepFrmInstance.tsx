import { useNavigate } from 'react-router-dom';

import { Button } from '@/ui'
import { useFormInstance } from '@/stores/useFormInstance';

export const FinalStepFrmInstance: React.FC = () => {
    const currentState = useFormInstance.getState().formInstance!;

    let publicCode = "0";
    if (currentState) publicCode = currentState.public_code;

    const navigate = useNavigate();

    const handleFinishClick = () => {
        navigate(`/instance-form/${publicCode}`);
        // Clear state.
        useFormInstance.setState({ formInstance: null });
    }

    const handleGoAnotherCodeClick = () => {
        navigate(`/publicCode`);
        // Clear state.
        useFormInstance.setState({ formInstance: null });
    }

    return (
        <>
            <div id="final-step-container-form-div" className="bg-white p-6 border rounded-xl flex flex-col justify-between items-center max-w-screen-sm h-full max-h-[430px] gap-7">
                <span className="text-3xl font-semibold">Thank you for complete this form.</span>
                <div className="flex flex-col gap-5 w-[70%]">
                    <span className="text-xl font-light text break-words">Your answers were correctly sent.</span>
                    <span className="text-xl font-light text break-words">You can close this window with the button below.</span>
                </div>
                <div className="flex gap-7 items-center justify-between w-full">
                    <Button
                        aria-label="Complete this form again"
                        onClick={() => handleFinishClick()}
                        variant="secondary"
                        type="button"
                        id="final-step-complete-again-btn"
                    >
                        Complete this form again
                    </Button>
                    <Button
                        aria-label="I Have another code"
                        onClick={() => handleGoAnotherCodeClick()}
                        variant="secondary"
                        type="button"
                        id="final-step-public-code-btn"
                    >
                        I Have another code
                    </Button>
                </div>
            </div>
        </>
    )
}
