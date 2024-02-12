import { Button } from '@/ui'
import React from 'react'

export const FinalStepIssueFrm = () => {
    return (
        <div id='final-step-container-form-div' className='bg-gray-300 p-10 border rounded-xl flex flex-col justify-between items-center max-w-screen-sm h-full max-h-[430px]'>
            <span className='text-3xl font-semibold'>Gracias por completar este formulario</span>
            <span className='text-2xl font-light text break-words'>Tus respuestas fueron correctamente comunicadas con tu centro de salud pertinente.
                Puedes descargar tus respuestas con el “DESCARGAR” debajo.
            </span>
            <div className='flex flex-col gap-7 items-center'>
                {/* <div>
                    <Button variant="primary" type="submit" id="final-step-submit-answer-btn" className='italic'>DESCARGAR</Button>
                </div> */}
                <div>
                    <Button variant="secondary" type="button" id="final-step-close-window-btn">Cerrar esta ventana</Button>
                </div>
            </div>
        </div>
    )
}
