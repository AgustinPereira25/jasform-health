import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';

import { useFormInstance } from '@/stores/useFormInstance';
import { Button } from '@/ui'
import { AnimatedCheckIcon } from '@/ui/common/AnimatedCheckIcon';

export const FinalStepFrmInstance: React.FC = () => {

    const previewMode = useFormInstance.getState().previewMode ?? false;
    const publicCode = useParams<{ publicCode: string }>().publicCode;

    const navigate = useNavigate();

    const handleFinishClick = () => {
        if (!previewMode) {
            navigate(`/instance-form/${publicCode}`);
            // Clear state.
            useFormInstance.setState({ formInstance: null });
        }
    }

    const handleGoAnotherCodeClick = () => {
        if (!previewMode) {
            navigate(`/publicCode`);
            // Clear state.
            useFormInstance.setState({ formInstance: null });
        }
    }

    return (
        <>
            <div id="final-step-container-form-div" className="bg-white p-6 border rounded-xl flex flex-col justify-between items-center max-w-screen-sm h-full max-h-[430px] gap-7">
                <span className="text-3xl font-semibold">Thank you for completing this form.</span>
                <div className="h-20 w-20">
                    <AnimatedCheckIcon />
                </div>
                <div className="flex flex-col gap-5 w-[70%]">
                    <span className="text-xl font-light text break-words">Your answers were correctly sent.</span>
                    <span className="text-xl font-light text break-words">You can close this tab, complete this form again or use another code.</span>
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
                        aria-label="I have another code"
                        onClick={() => handleGoAnotherCodeClick()}
                        variant="secondary"
                        type="button"
                        id="final-step-public-code-btn"
                    >
                        I have another code
                    </Button>
                </div>
            </div>
        </>
    )
}
