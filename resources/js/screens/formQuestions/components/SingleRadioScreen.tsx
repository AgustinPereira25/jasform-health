import { IFormQuestion } from '@/api';
import { Button, Input, icons } from '@/ui'
import ComboBox from '@/ui/form/Combobox';
import React, { useState } from 'react'

interface SingleRadioScreenProps {
    nextSteps: IFormQuestion[];
};

// TODO - Make input text full height (it overflows the container).
export const SingleRadioScreen: React.FC<SingleRadioScreenProps> = ({ nextSteps = [] }) => {

    // TODO - Fetch questions from API
    const formQuestionsTest = [{
        id: 1, option_title: 'Option 1',
        next_step: 'Next Step 1'
    }, { id: 2, option_title: 'Option 2', next_step: 'Next Step 2' }
        , { id: 3, option_title: 'Option 3', next_step: 'Next Step 3' },
    { id: 4, option_title: 'Option 4', next_step: 'Next Step 4' }
    ];

    const transformedSteps = nextSteps.map((item, idx) => ({ id: item.id!, name: `STEP ${idx + 1}` }));

    const [questions, setQuestions] = useState(formQuestionsTest);
    const [newInput, setNewInput] = useState('');
    const [newQuestionType, setNewQuestionType] = useState(transformedSteps[0] ?? { id: 0, name: '' });

    const handleAddRowClick = (input: string, questionType: { id: number, name: string }) => {
        const getLastQuestionId = Object.values(questions).pop()?.id;

        const lastQuestionId = getLastQuestionId ? getLastQuestionId + 1 : 1;
        const newElement = { id: lastQuestionId, option_title: input, next_step: questionType.name };
        setQuestions([...questions, newElement]);
    }
    return (
        <div className='flex flex-col pt-3'>
            <div className="flex gap-3">
                <span className='shrink-0'>Question to show</span>
                <Input
                    containerClassName="w-full"
                    // fullHeight
                    type="text"
                    id="question_to_show"
                    placeholder="Question to Show"
                // error={errors.firstName?.message}
                // value={passwordInput}
                // defaultValue={user?.first_name}
                />
            </div>
            <hr />
            <div className="flex flex-col py-4">
                <div className='flex justify-between bg-gray-100 py-3 px-3 border rounded-t-lg border-gray-300 text-gray-500 w-full'>
                    <span className='w-[53%] text-xs grow'>OPTION TITLE</span>
                    <span className='w-[33%] text-xs grow'>NEXT STEP</span>
                    <span className='w-[13%] text-xs grow'></span>
                </div>
                <div className='flex flex-col gap-3 justify-between py-3 px-3 border border-gray-300 text-black w-full'>
                    {
                        questions.map((item) => {
                            return (
                                <div key={item.id} className='flex w-full'>
                                    <span className='w-[53%] text-xs grow'>{item.option_title}</span>
                                    <span className='w-[33%] text-xs grow'>{item.next_step}</span>
                                    <div className='flex justify-center gap-3 w-[13%] grow'>
                                        <icons.TrashIcon className='w-5 h-5' />
                                        <icons.DocumentDuplicateIcon className='w-5 h-5' />
                                        <icons.ArrowsUpDownIcon className='w-5 h-5' />
                                    </div>
                                </div>
                            )
                        }
                        )
                    }
                </div>
                <div className='flex items-center justify-center gap-4 py-3 px-3 text-black w-full'>
                    <span>Add New Option</span>
                    <Input
                        type="text"
                        id="new_option"
                        placeholder="Add a new option"
                        compact
                        onChange={(e) => setNewInput(e.target.value)}
                    />
                    <ComboBox
                        id="questionType"
                        items={transformedSteps}
                        // defaultValue={'Simple Text'}
                        onValueChange={(item) => setNewQuestionType(item)}
                    />
                    <Button
                        variant='secondary'
                        onClick={() => handleAddRowClick(newInput, newQuestionType)}
                    >
                        + Add
                    </Button>
                </div>
            </div>
        </div>
    )
}