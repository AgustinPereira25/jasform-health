import type { IFormQuestion } from '@/api';
import { Button, Input, icons } from '@/ui'
import ComboBox from '@/ui/form/Combobox';
import { tw } from '@/utils';
import React, { useEffect, useState } from 'react'

export type ComboBoxOption = "Check Box" | "Radio Button" | "Drop Down Combo";

interface CheckRadioDDownQuestions {
    id: number;
    order: number;
    title: string;
    next_question?: string;
};

interface CheckRadioDDownScreenProps {
    nextSteps?: IFormQuestion[];
    comboBoxOption: ComboBoxOption;
};

// TODO - Make input text full height (it overflows the container).
export const CheckRadioDDownScreen: React.FC<CheckRadioDDownScreenProps> = ({ nextSteps = [], comboBoxOption }) => {

    // TODO - Fetch questions from API
    const formQuestionsTest = [{
        id: 2, order: 1, title: 'Option 1',
        next_question: 'Next Step 1'
    }, { id: 1, order: 2, title: 'Option 2', next_question: 'Next Step 2' }
        , { id: 3, order: 3, title: 'Option 3', next_question: 'Next Step 3' },
    { id: 4, order: 4, title: 'Option 4', next_question: 'Next Step 4' }
    ];

    const transformedSteps = nextSteps ? nextSteps.map((item) => ({ id: item.order!, name: item.title! })) : [];
    const [newQuestionType, setNewQuestionType] = useState(transformedSteps[0] ?? { id: 0, name: '' });

    const [questions, setQuestions] = useState<CheckRadioDDownQuestions[]>(formQuestionsTest);
    const [newInput, setNewInput] = useState('');
    const [isInputEmpty, setIsInputEmpty] = useState(false);

    const handleAddRowClick = (input: string, questionType: { id: number, name: string }, comboBoxOption: ComboBoxOption) => {
        if (!newInput) {
            setIsInputEmpty(true);
            return;
        }

        const getLastQuestionOrder = Object.values(questions).pop()?.order;
        const lastQuestionOrder = getLastQuestionOrder ? getLastQuestionOrder + 1 : 1;
        const getLastQuestionId = Object.values(questions).pop()?.id;
        const lastQuestionId = getLastQuestionId ? getLastQuestionId + 1 : 1;
        if (comboBoxOption === 'Radio Button') {
            const newElement = { id: lastQuestionId, order: lastQuestionOrder, title: input, next_question: questionType.name };
            setQuestions([...questions, newElement]);
            setNewInput('');
            return;
        } else {
            const newElement = { id: lastQuestionId, order: lastQuestionOrder, title: input };
            setQuestions([...questions, newElement]);
            setNewInput('');
            return;
        }
    }
    const handleDeleteRowClick = (id: number) => {
        const newQuestions = questions.filter((item) => item.id !== id);
        setQuestions(newQuestions);
    }

    const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewInput(event.target.value);
        setIsInputEmpty(false);
    }

    const handleUpClick = (item: CheckRadioDDownQuestions) => {
        const index = questions.indexOf(item);
        if (index > 0) {
            questions[index]!.order = questions[index]!.order - 1;
            questions[index - 1]!.order = questions[index]!.order + 1;
            const temp = questions[index]!;
            questions[index] = questions[index - 1]!;
            questions[index - 1] = temp;
            setQuestions([...questions]);
        }
    }

    const handleDownClick = (item: CheckRadioDDownQuestions) => {
        const index = questions.indexOf(item);
        if (index < questions.length - 1) {
            questions[index]!.order = questions[index]!.order + 1;
            questions[index + 1]!.order = questions[index]!.order - 1;
            const temp = questions[index]!;
            questions[index] = questions[index + 1]!;
            questions[index + 1] = temp;
            setQuestions([...questions]);
        }
    }

    useEffect(() => {
        setNewInput('');
        setIsInputEmpty(false);
        setNewQuestionType(transformedSteps[0] ?? { id: 0, name: '' });
        setQuestions(formQuestionsTest);
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [comboBoxOption]);

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
                    <span className={tw('text-xs grow',
                        comboBoxOption === 'Radio Button' && 'w-[53%]',
                        comboBoxOption !== 'Radio Button' && 'w-[86%]',
                    )}>OPTION TITLE</span>
                    {comboBoxOption === 'Radio Button' && (
                        <span className='w-[33%] text-xs grow'>NEXT STEP</span>
                    )}
                    <span className='w-[13%] text-xs grow'></span>
                </div>
                <div className='flex flex-col gap-3 justify-between border border-gray-300 text-black w-full'>
                    {
                        questions.map((item) => {
                            return (
                                <div key={item.id} className='flex w-full hover:bg-gray-200 py-3 px-3'>
                                    <span className={tw('text-xs grow',
                                        comboBoxOption === 'Radio Button' && 'w-[53%]',
                                        comboBoxOption !== 'Radio Button' && 'w-[86%]',
                                    )}>{item.title}</span>
                                    {comboBoxOption === 'Radio Button' && (
                                        <span className='w-[33%] text-xs grow'>{item.next_question}</span>
                                    )}
                                    <div className='flex justify-center gap-3 w-[13%] grow'>
                                        <icons.TrashIcon className='w-5 h-5' onClick={() => handleDeleteRowClick(item.id)} />
                                        <icons.DocumentDuplicateIcon className='w-5 h-5' />
                                        <icons.ArrowUpIcon className='w-5 h-5' onClick={() => handleUpClick(item)} />
                                        <icons.ArrowDownIcon className='w-5 h-5' onClick={() => handleDownClick(item)} />
                                    </div>
                                </div>
                            )
                        }
                        )
                    }
                </div>
                <div className='flex items-center justify-center gap-4 py-3 px-3 text-black w-full h-16'>
                    <span>Add New Option</span>
                    <Input
                        type="text"
                        id="new_option"
                        placeholder="Add a new option"
                        compact
                        onChange={(e) => handleInputOnChange(e)}
                        error={isInputEmpty && 'This field is required'}
                        containerClassName='h-full'
                        value={newInput}
                    />
                    {
                        comboBoxOption === "Radio Button" && (
                            <ComboBox
                                id="questionType"
                                items={transformedSteps}
                                defaultValue={transformedSteps[0]?.name}
                                onValueChange={(item) => setNewQuestionType(item)}
                            />
                        )
                    }
                    <Button
                        variant='secondary'
                        onClick={() => handleAddRowClick(newInput, newQuestionType, comboBoxOption)}
                    >
                        + Add
                    </Button>
                </div>
            </div>
        </div>
    )
}