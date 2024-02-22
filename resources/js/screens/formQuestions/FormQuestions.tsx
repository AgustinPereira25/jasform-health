import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, icons } from '@/ui'
import { tw } from '@/utils'
import type { IFormQuestion } from '@/api'
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

    const { id: formId } = useParams();
    const navigate = useNavigate();

    // TODO - Order is undefined?
    formQuestions = formQuestions.sort((a, b) => a.order! - b.order!)
    const [questions, setQuestions] = useState(formQuestions);
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [currentQuestionOrder, setCurrentQuestionOrder] = useState(currentQuestion?.order);
    const [questionTypeForm, setQuestionTypeForm] = useState<keyof typeof questionScreens>(1);
    const [comboBoxOption, setComboBoxOption] = useState<'Check Box' | 'Radio Button' | 'Drop Down Combo'>('Check Box');

    const handleAddQuestionClick = () => {
        const getLastQuestionOrder = Object.values(questions).pop()?.order;

        const lastQuestionOrder = getLastQuestionOrder ? getLastQuestionOrder + 1 : 1;
        const newElement: IFormQuestion = { order: lastQuestionOrder };
        setQuestions([...questions, newElement]);
    };

    const handleQuestionClick = (item: IFormQuestion, order: number) => {
        setCurrentQuestion(item);
        setCurrentQuestionOrder(order);
    }

    const QuestionTypeScreen = questionScreens[questionTypeForm];

    const handleComboboxChange = (id: keyof typeof questionScreens) => {
        setQuestionTypeForm(id);
        switch (id) {
            case 3:
                setComboBoxOption('Check Box');
                break;
            case 4:
                setComboBoxOption('Radio Button');
                break;
            case 5:
                setComboBoxOption('Drop Down Combo');
                break;
        }
    }

    const handleDeleteClick = (item: IFormQuestion) => {
        const newQuestions = questions.filter((question) => question.order !== item.order);
        setQuestions(newQuestions);
    }

    const handleUpClick = (item: IFormQuestion) => {
        const index = questions.indexOf(item);
        if (index > 0) {
            questions[index]!.order = questions[index]!.order! - 1;
            questions[index - 1]!.order = questions[index]!.order! + 1;
            const temp = questions[index]!;
            questions[index] = questions[index - 1]!;
            questions[index - 1] = temp;
            setQuestions([...questions]);
        }
    }

    const handleDownClick = (item: IFormQuestion) => {
        const index = questions.indexOf(item);
        if (index < questions.length - 1) {
            questions[index]!.order = questions[index]!.order! + 1;
            questions[index + 1]!.order = questions[index]!.order! - 1;
            const temp = questions[index]!;
            questions[index] = questions[index + 1]!;
            questions[index + 1] = temp;
            setQuestions([...questions]);
        }
    }

    return (
        <div className="pb-6 h-[90%]">
            <div className="bg-white flex items-center justify-between px-2 pb-4 text-base font-semibold leading-7">
                <div className="flex gap-1 items-center">
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
                            <span className="text-2xl text-gray-500 italic">- Form Code: {formId}</span>
                        )
                    }
                </div>
                <div className="flex gap-5">
                    <Button
                        type="submit"
                        variant="primary"
                    >
                        Save
                    </Button>
                </div>
            </div>
            <div className="flex gap-3 w-full h-full">
                <div className="bg-white shadow-lg pt-4 px-6 pb-2 border-[1px] rounded-xl w-[30%]">
                    <span>Content</span>
                    <div className="flex flex-col items-center">
                        {
                            questions.map((item, idx) => {
                                return (
                                    <div
                                        id={item.order?.toString()}
                                        key={item.order}
                                        className="flex relative w-full items-center hover:bg-gray-50"
                                        onClick={() => handleQuestionClick(item, item.order!)}
                                        role="presentation"
                                    >
                                        <div className={tw(`absolute border-l-4 h-[80%] -left-2`,
                                            item.order === currentQuestion?.order && 'border-l-[#407EC9]'
                                        )}
                                        />
                                        <div className={
                                            tw(`flex w-full h-14 justify-between`,
                                                idx === 0 && `border-t border-t-gray-200`,
                                                idx !== 0 && `border-y border-y-gray-200`
                                            )}>
                                            <div className="flex flex-col justify-center pl-3">
                                                <span className={tw(`text-sm font-semibold`,
                                                    item.order === currentQuestion?.order && 'text-[#407EC9]',
                                                    item.order !== currentQuestion?.order && 'text-[#6B7280]'
                                                )}
                                                >
                                                    Question {item.order} - {item.title}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <icons.TrashIcon className="w-5 h-5" onClick={() => handleDeleteClick(item)} />
                                                <icons.DocumentDuplicateIcon className="w-5 h-5" />
                                                <icons.ArrowUpIcon className="w-5 h-5" onClick={() => handleUpClick(item)} />
                                                <icons.ArrowDownIcon className="w-5 h-5" onClick={() => handleDownClick(item)} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="pt-2">
                            <Button
                                variant="secondary"
                                onClick={handleAddQuestionClick}
                            >
                                + Add Question
                            </Button>
                        </div>
                    </div>
                </div>
                {/* TODO - Make this html a component */}
                <div className="bg-white shadow-lg pt-4 px-4 pb-2 border-[1px] rounded-xl w-[70%]">
                    {
                        currentQuestion && (
                            <div className="h-full">
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">Question {currentQuestionOrder}</span>
                                    </div>
                                    <div className="flex gap-2 items-center pb-2">
                                        <span>Question Type</span>
                                        <ComboBox
                                            id="questionType"
                                            items={questionTypes}
                                            defaultValue={'Simple Text'}
                                            onValueChange={(item) => handleComboboxChange(item.id as keyof typeof questionScreens)}
                                        />
                                    </div>
                                </div>
                                <hr />
                                <QuestionTypeScreen text="pepe" nextSteps={questions} comboBoxOption={comboBoxOption} />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default QuestionsForm;
