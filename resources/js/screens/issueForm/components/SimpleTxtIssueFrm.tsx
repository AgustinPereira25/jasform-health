import { Button, Input } from '@/ui'
import React from 'react'

export const SimpleTxtIssueFrm = () => {
    return (
        <div id='simple-txt-container-form-div' className='bg-gray-300 p-7 border rounded-xl'>
            <span>Pregunta: Cómo estuvo tu último examen?</span>
            <form id='simple-txt-container-form-form' className='flex flex-col justify-between h-full'>
                <div className='flex flex-col pt-6 pb-20 gap-4'>
                    <Input
                        type="text"
                        name="answer"
                        id="simple-txt-answer"
                        placeholder='Tu Respuesta'
                    />
                </div>
                <div className='flex justify-between'>
                    <Button type="submit" id="submit-answer-btn">Siguiente</Button>
                </div>
            </form>
        </div>
    )
}
