import React, { useState } from 'react'
import { Button, icons } from '@/ui'
import { useForm } from 'react-hook-form'
import { tw } from '@/utils'
import type { IFormQuestion } from '@/api'
import { useNavigate, useParams } from 'react-router-dom'
import ComboBox from '@/ui/form/Combobox'
import { questionScreens } from './utils'

interface FormQuestionsProps {
    initialData: IFormQuestion[];
}

// TODO - Finish this implementation by seeing figma and replying the design with the components.
export const QuestionsForm: React.FC<FormQuestionsProps> = ({ initialData: formQuestions = [] }) => {

    // TODO- Put this in constants file
    const questionTypes = [
        { id: 1, name: "Simple Text" },
        { id: 2, name: "Input Field" },
        { id: 3, name: "Multiple Choice - Check Box" },
        { id: 4, name: "Single Option - Radio Button" },
        { id: 5, name: "Single Option - Drop Down Combo" },
    ];

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        // setError,
    } = useForm();

    const onSubmit = (data: IFormQuestion[]) => {
        console.log(data);
        // if (!data.phone) {
        //     setError("phone", {
        //         type: "manual",
        //         message: "error!!!",
        //     },{shouldFocus: true})
        // }
    };

    const { id: formId } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState(formQuestions);
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

    const [questionTypeForm, setQuestionTypeForm] = useState<keyof typeof questionScreens>(1);

    const handleAddQuestionClick = () => {
        const getLastQuestionId = Object.values(questions).pop()?.id;

        const lastQuestionId = getLastQuestionId ? getLastQuestionId + 1 : 1;
        const newElement: IFormQuestion = { id: lastQuestionId };
        setQuestions([...questions, newElement]);
    };

    const handleQuestionClick = (item: IFormQuestion, idx: number) => {
        setCurrentQuestion(item);
        setCurrentQuestionIdx(idx);
    }

    const QuestionTypeScreen = questionScreens[questionTypeForm];

    const handleComboboxChange = (id: keyof typeof questionScreens, name: string) => {
        setValue("questionType", name);
        setQuestionTypeForm(id);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white flex items-center justify-between px-2 pb-4 text-base font-semibold leading-7">
                <div className='flex gap-1 items-center'>
                    <Button
                        variant="secondary"
                        onClick={() => navigate(-1)}
                    >
                        <icons.ArrowLeftIcon className={tw(`w-5 h-5`)} />
                        Return
                    </Button>
                    <span className="pl-3 text-2xl text-black">
                        Form&apos;s Questions
                    </span>
                    {
                        formId && (
                            <span className='text-2xl text-gray-500 italic'>- Form Code: {formId}</span>
                        )
                    }
                </div>
                <div className='flex gap-5'>
                    <Button
                        type='submit'
                        variant="primary"
                    >
                        Save
                    </Button>
                </div>
            </div>
            <div className="flex gap-3 w-full">
                <div className='bg-white shadow-lg pt-4 px-6 pb-2 border-[1px] rounded-xl w-[30%]'>
                    <span>Content</span>
                    <div className="flex flex-col items-center">
                        {
                            questions.map((item, idx) => {
                                return (
                                    <div
                                        id={item.id?.toString()}
                                        key={item.id}
                                        className='flex relative w-full items-center hover:bg-gray-50'
                                        onClick={() => handleQuestionClick(item, idx)}
                                        role='presentation'
                                    >
                                        <div className={tw(`absolute border-l-4 h-[80%] -left-2`,
                                            item.id === currentQuestion?.id && 'border-l-[#407EC9]'
                                        )}
                                        />
                                        <div className={
                                            tw(`flex w-full h-14 justify-between`,
                                                idx === 0 && `border-t border-t-gray-200`,
                                                idx !== 0 && `border-y border-y-gray-200`
                                            )}>
                                            <div className='flex flex-col justify-center pl-3'>
                                                <span className={tw(`text-xs font-semibold`,
                                                    item.id === currentQuestion?.id && 'text-[#407EC9]',
                                                    item.id !== currentQuestion?.id && 'text-[#6B7280]'
                                                )}
                                                >
                                                    STEP {idx + 1}
                                                </span>
                                                <span className='text-sm font-medium'>{item.title}</span>
                                            </div>
                                            <div className='flex gap-2 items-center'>
                                                <icons.TrashIcon className='w-5 h-5' />
                                                <icons.DocumentDuplicateIcon className='w-5 h-5' />
                                                <icons.Bars3Icon className='w-5 h-5' />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className='pt-2'>
                            <Button
                                variant='secondary'
                                onClick={handleAddQuestionClick}
                            >
                                + Add Question
                            </Button>
                        </div>
                    </div>
                </div>
                {/* TODO - Make this html a component */}
                <div className='bg-white shadow-lg pt-4 px-4 pb-2 border-[1px] rounded-xl w-[70%]'>
                    {
                        currentQuestion && (
                            <div>
                                <div className='flex justify-between'>
                                    <div className='flex flex-col'>
                                        <span className={tw(`text-xs font-semibold`, 'text-[#407EC9]')}
                                        >
                                            STEP {currentQuestionIdx + 1}
                                        </span>
                                        <span className='text-sm font-medium'>{currentQuestion.title}</span>
                                    </div>
                                    <div className='flex gap-2 items-center pb-2'>
                                        <span>Question Type</span>
                                        <ComboBox
                                            id="questionType"
                                            items={questionTypes}
                                            defaultValue={'Simple Text'}
                                            {...register("questionType")}
                                            onValueChange={(item) => handleComboboxChange(item.id as keyof typeof questionScreens, item.name)}
                                        />
                                    </div>
                                </div>
                                <hr />
                                {/* TODO - Place the dynamic component to render */}
                                <QuestionTypeScreen />
                            </div>
                        )
                    }
                </div>
            </div>
        </form>
    )
}

export default QuestionsForm;