
import { useEffect, useRef, useState } from "react";
import { Label, TextInput, Tooltip } from 'flowbite-react';
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/router";
import { Button, BackgroundGradientAnimation } from "@/ui";
import { message } from "@/constants/message";

export const PublicCode: React.FC = () => {
    const navigate = useNavigate();

    const [goToFormDisabled, setGoToFormDisabled] = useState(true);
    const publicCodeRef = useRef<HTMLInputElement>(null);
    const auxCodeRef = useRef<HTMLInputElement>(null);

    const [publicCodeInputValue, setPublicCodeInputValue] = useState('');
    useEffect(() => {
        const isUpperCase = publicCodeInputValue === publicCodeInputValue.toUpperCase();
        const isSixLetters = publicCodeInputValue.length === 6;

        if (isUpperCase && isSixLetters) {
            setGoToFormDisabled(false);
        } else {
            setGoToFormDisabled(true);
        }
    }, [publicCodeInputValue]);

    return (
        <BackgroundGradientAnimation>
            <div
                className="pointer-events-auto flex h-screen grow items-center justify-center gap-9 bg-gradient-to-r from-secondary to-primary px-6 py-12 lg:px-8"
            >
                <div className="bg-white p-8 rounded-lg z-90 ">
                    <div className="flex justify-center mb-4">
                        <h2 className="text-2xl font-medium text-primary">Welcome!</h2>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="publicCodeRef" value="Form Public Code*" />
                            </div>
                            <Tooltip

                                content={message.TOOLTIP_PUBLIC_FORM} className="text-nowrap" placement="right"
                            >
                                <TextInput className="w-full uppercase" id="publicCode" ref={publicCodeRef} placeholder="ABCDEF" required
                                    value={publicCodeInputValue}
                                    onChange={(e) => setPublicCodeInputValue(e.target.value.toUpperCase())} maxLength={6} />
                            </Tooltip>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="auxCodeRef" value="Auxiliary Code (optional)" />
                            </div>
                            <div className="">
                                <Tooltip

                                    content={message.TOOLTIP_FORM_AUX_CODE} className="text-nowrap" placement="right"
                                >
                                    <TextInput className="w-full" id="auxCode" ref={auxCodeRef} placeholder="Optional auxiliary code" />
                                </Tooltip>
                            </div>
                        </div>
                        <div className="flex justify-center w-full">
                            <Button disabled={goToFormDisabled} variant="primary" className=
                                {!goToFormDisabled ? "bg-[#773DBD] hover:bg-[#3b1882]" : ""}
                                onClick={() => {
                                    navigate(ROUTES.instanceFormHome + "/" + publicCodeRef.current?.value + "?aux_code=" + auxCodeRef.current?.value);
                                }}>Go to Form</Button>
                        </div>

                    </div>
                </div>

            </div>

        </BackgroundGradientAnimation>
    )

}
