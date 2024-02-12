import React from 'react'
import { Button, Input } from '@/ui'
import ComboBox from '@/ui/form/Combobox';

interface ChckRadioDDownIssueFrmProps {
    questiontypeId: 1 | 2 | 3 | 4 | 5;
}
export const ChckRadioDDownIssueFrm: React.FC<ChckRadioDDownIssueFrmProps> = ({ questiontypeId }) => {

    return (
        <div id='chck-radio-container-form-div' className='bg-gray-300 p-6 border rounded-xl'>
            <span>Pregunta: Seleccione un sintoma</span>
            <form id='chck-radio-container-form-form' className='flex flex-col justify-between h-full'>
                <div className='flex flex-col pt-6 pb-20 gap-4'>

                    {
                        questiontypeId === 3 ? (
                            <>
                                <div className='flex items-center gap-3'>
                                    <Input
                                        compact
                                        type="checkbox"
                                        name="answer"
                                        id="chck-radio-answer-checkbox-1"
                                        value={'Answer 1'}
                                    />
                                    <label htmlFor="chck-radio-answer-checkbox-1">Answer 1</label>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Input
                                        compact
                                        type="checkbox"
                                        name="answer"
                                        id="chck-radio-answer-checkbox-2"
                                        value={'Answer 2'}
                                    />
                                    <label htmlFor="chck-radio-answer-checkbox-2">Answer 2</label>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Input
                                        compact
                                        type="checkbox"
                                        name="answer"
                                        id="chck-radio-answer-checkbox-3"
                                        value={'Answer 3'}
                                    />
                                    <label htmlFor="chck-radio-answer-checkbox-3">Answer 3</label>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Input
                                        compact
                                        type="checkbox"
                                        name="answer"
                                        id="chck-radio-answer-checkbox-4"
                                        value={'Answer 4'}
                                    />
                                    <label htmlFor="chck-radio-answer-checkbox-4">Answer 4</label>
                                </div>
                            </>
                        ) : questiontypeId === 4 ? (
                            <>
                                <div className='flex items-center gap-3'>
                                    <Input
                                        compact
                                        type="radio"
                                        name="answer"
                                        id="chck-radio-answer-radio-1"
                                        value={'Answer 1'}
                                    />
                                    <label htmlFor="chck-radio-answer-radio-1">Answer 1</label>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Input
                                        compact
                                        type="radio"
                                        name="answer"
                                        id="chck-radio-answer-radio-2"
                                        value={'Answer 2'}
                                    />
                                    <label htmlFor="chck-radio-answer-radio-2">Answer 2</label>
                                </div>
                            </>
                        ) : (
                            <ComboBox
                                id="chck-radio-answer-dropdown"
                                items={[{ id: 1, name: 'Mock Answer 1' }, { id: 2, name: 'Mock Answer 2' }, { id: 3, name: 'Mock Answer 3' }]}
                                defaultValue={'Mock Answer 1'}
                                // onValueChange={(item) => handleComboboxChange(item.id as keyof typeof questionScreens)}
                                onValueChange={(item) => console.log(item)}
                            />
                        )
                    }
                </div>
                <div className='flex justify-between'>
                    <Button variant='secondary' type="button" id="goBack-answer-btn">Atrás</Button>
                    <Button type="submit" id="submit-answer-btn">Siguiente</Button>
                </div>
            </form>
        </div >
    )
}
