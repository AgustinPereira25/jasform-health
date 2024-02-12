import { Button, Input } from '@/ui'
import React from 'react'

export const InputFieldIssueFrm = () => {
    return (
        <div id='input-field-container-form-div' className='bg-gray-300 p-7 border rounded-xl'>
            <span>Question To Show: Question example</span>
            <form id='input-field-container-form-form' className='flex flex-col justify-between h-full'>
                <div className='flex flex-col pt-6 pb-20 gap-4'>
                    <Input
                        type="text"
                        name="answer"
                        id="input-field-answer"
                        placeholder='Tu Respuesta'
                    />
                </div>
                <div className='flex justify-between'>
                    <Button variant='secondary' type="button" id="goBack-answer-btn">Atrás</Button>
                    <Button type="submit" id="submit-answer-btn">Siguiente</Button>
                </div>
            </form>
        </div>
    )
}
