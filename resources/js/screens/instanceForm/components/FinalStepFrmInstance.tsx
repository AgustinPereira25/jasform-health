import { Button } from '@/ui'
import { useFormInstance } from '@/stores/useFormInstance';

export const FinalStepFrmInstance: React.FC = () => {
    const handleFinishClick = () => {
        // Clear state.
        useFormInstance.setState({ formInstance: null });
    }

    return (
        <>
            <div id="final-step-container-form-div" className="bg-white p-10 border rounded-xl flex flex-col justify-between items-center max-w-screen-sm h-full max-h-[430px] gap-7">
                <span className="text-3xl font-semibold">Thank you for complete this form.</span>
                <div className="flex flex-col gap-5 w-[70%]">
                    <span className="text-xl font-light text break-words">Your answers were correctly sent.</span>
                    <span className="text-xl font-light text break-words">You can close this window with the button below.</span>
                </div>
                <div className="flex flex-col gap-7 items-center">
                    <div>
                        <Button onClick={handleFinishClick} variant="secondary" type="button" id="final-step-close-window-btn">Close this window</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
