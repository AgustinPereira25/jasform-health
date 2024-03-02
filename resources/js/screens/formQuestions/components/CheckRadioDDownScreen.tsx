import React, { useEffect, useState } from 'react'

import { Button, Input, icons } from '@/ui'
import ComboBox from '@/ui/form/Combobox';
import { tw } from '@/utils';
import type { Question, QuestionsOption } from '@/api';

export type ComboBoxOption = "Check Box" | "Radio Button" | "Drop Down Combo";

interface CheckRadioDDownScreenProps {
    formQuestions?: Question[];
    comboBoxOption: ComboBoxOption;
    currentQuestionOrder?: number;
    setQuestions: (questions: Question[]) => void;
    setCurrentQuestion?: (question: Question) => void;
};
// TODO - Export this interface..
interface ComboBoxOptions {
    id: number | null;
    name: string;
};

// TODO - Make input text full height (it overflows the container).
export const CheckRadioDDownScreen: React.FC<CheckRadioDDownScreenProps> = ({ formQuestions = [], comboBoxOption, currentQuestionOrder = 0, setQuestions }) => {
    // console.log(formQuestions)

    const getLastQuestionOrder = (questionsOption: QuestionsOption[]) => {
        return Object.values(questionsOption).pop()?.order ?? 1;
    };

    const transformedSteps: ComboBoxOptions[] = formQuestions ? formQuestions.map((item) => ({ id: item.order, name: item.title })) : [];

    const [newQuestionType, setNewQuestionType] = useState<ComboBoxOptions>(transformedSteps[0] ?? { id: 1, name: '' });

    const currentFormQuestion = formQuestions.find((item) => item.order === currentQuestionOrder);
    // console.log('currentFormQuestion', currentFormQuestion);
    const currentFormQuestionOptionsList = currentFormQuestion ? currentFormQuestion.question_options?.map((item) => (item)) : [];
    const [questionsOption, setQuestionsOption] = useState<QuestionsOption[]>(currentFormQuestionOptionsList ?? []);
    const [newInput, setNewInput] = useState('');
    const [isInputEmpty, setIsInputEmpty] = useState(false);
    const [questionToShow, setQuestionToShow] = useState(currentFormQuestion?.title ?? '');

    // Add default options to the list on the top of the list
    transformedSteps.unshift({ id: -1, name: 'Default Next Question' });
    transformedSteps.push({ id: 0, name: 'Go To End' });

    useEffect(() => {
        setQuestionToShow(currentFormQuestion!.title ?? '');
    }, [currentQuestionOrder]);

    const getQuestionTypeName = (questionTypeId: number) => {
        const questionType = transformedSteps.find((item) => item.id === questionTypeId);
        return questionType?.name ?? '';
    }

    const handleAddRowClick = (input: string, comboBoxOption: ComboBoxOption) => {
        if (!newInput) {
            setIsInputEmpty(true);
            return;
        }

        //const getLastQuestionOrder = Object.values(questionsOption).pop()?.order;
        // const getLastQuestionOrder = getLastQuestionOrder(questionsOption);
        // const lastQuestionOrder = getLastQuestionOrder ? getLastQuestionOrder + 1 : 1;
        const lastQuestionOrder = getLastQuestionOrder(questionsOption) + 1;
        if (comboBoxOption === 'Radio Button' || comboBoxOption === 'Drop Down Combo') {
            // TODO - change form question id
            const newElement: QuestionsOption = { order: lastQuestionOrder, title: input, next_question: newQuestionType.id };
            setQuestionsOption([...questionsOption, newElement]);
            setNewInput('');
            // Update the formQuestions general state
            const updatedQuestions = formQuestions?.map((question) => {
                if (question.order === currentQuestionOrder) {
                    return {
                        ...question,
                        question_options: [...questionsOption, newElement],
                    };
                }
                return question;
            });
            setQuestions(updatedQuestions ?? []);
        } else {
            const newElement = { order: lastQuestionOrder, title: input, next_question: null };
            // setQuestionsOption([...questionsOption, newElement]);
            setNewInput('');
            // Update the formQuestions general state
            const updatedQuestions = formQuestions?.map((question) => {
                if (question.order === currentQuestionOrder) {
                    const newQuestionOptions = question.question_options!.map((item) => (delete item.id, { ...item, next_question: null }));
                    setQuestionsOption([...newQuestionOptions, newElement]);
                    return {
                        ...question,
                        question_options: [...questionsOption, newElement],
                    };
                }
                return question;
            });
            setQuestions(updatedQuestions ?? []);
        }
    }
    const handleDeleteRowClick = (order: number) => {
        const newQuestions = questionsOption.filter((item) => item.order !== order);
        setQuestionsOption(newQuestions);
        // Update the formQuestions general state
        const updatedQuestions = formQuestions?.map((question) => {
            if (question.order === currentQuestionOrder) {
                return {
                    ...question,
                    question_options: [...newQuestions],
                };
            }
            return question;
        });
        setQuestions(updatedQuestions ?? []);
    }

    const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewInput(event.target.value);
        setIsInputEmpty(false);
    }

    const handleUpClick = (item: QuestionsOption) => {
        const index = questionsOption.indexOf(item);
        if (index > 0) {
            questionsOption[index]!.order = questionsOption[index]!.order - 1;
            questionsOption[index - 1]!.order = questionsOption[index]!.order + 1;
            const temp = questionsOption[index]!;
            questionsOption[index] = questionsOption[index - 1]!;
            questionsOption[index - 1] = temp;
            setQuestionsOption([...questionsOption]);
            // Update the formQuestions general state
            const updatedQuestions = formQuestions?.map((question) => {
                if (question.order === currentQuestionOrder) {
                    question.question_options?.map((item) => {
                        return {
                            ...item,
                            next_question: "null",
                        };
                    });
                    return {
                        ...question,
                        question_options: [...questionsOption],
                    };
                }
                return question;
            });
            setQuestions(updatedQuestions ?? []);
        }
    }

    const handleDownClick = (item: QuestionsOption) => {
        const index = questionsOption.indexOf(item);
        if (index < questionsOption.length - 1) {
            questionsOption[index]!.order = questionsOption[index]!.order + 1;
            questionsOption[index + 1]!.order = questionsOption[index]!.order - 1;
            const temp = questionsOption[index]!;
            questionsOption[index] = questionsOption[index + 1]!;
            questionsOption[index + 1] = temp;
            setQuestionsOption([...questionsOption]);
            // Update the formQuestions general state
            const updatedQuestions = formQuestions?.map((question) => {
                if (question.order === currentQuestionOrder) {
                    return {
                        ...question,
                        question_options: [...questionsOption],
                    };
                }
                return question;
            });
            setQuestions(updatedQuestions ?? []);
        }
    }

    useEffect(() => {
        setNewInput('');
        setIsInputEmpty(false);
        setNewQuestionType(transformedSteps[0] ?? { id: 0, name: '' });
        setQuestionsOption(currentFormQuestionOptionsList ?? []);
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [comboBoxOption]);

    const handleComboBoxChange = (value: ComboBoxOptions) => {
        setNewQuestionType(value);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionToShow(event.target.value);
        const updatedQuestions = formQuestions?.map((question) => {
            if (question.order === currentQuestionOrder) {
                return {
                    ...question,
                    title: event.target.value,
                };
            }
            return question;
        });
        setQuestions(updatedQuestions ?? []);
    }
    return (
        <div className="flex flex-col pt-3">
            <div className="flex gap-3">
                <span className="shrink-0">Question to show</span>
                <Input
                    containerClassName="w-full"
                    // fullHeight
                    type="text"
                    id="question_to_show"
                    placeholder="Question to Show"
                    // error={errors.firstName?.message}
                    value={questionToShow}
                    onChange={(event) => handleChange(event)}
                />
            </div>
            <hr />
            <div className="flex flex-col py-4">
                <div className="flex justify-between bg-gray-100 py-3 px-3 border rounded-t-lg border-gray-300 text-gray-500 w-full">
                    <span className={tw('text-xs grow',
                        (comboBoxOption === 'Radio Button' || comboBoxOption === 'Drop Down Combo') && 'w-[53%]',
                        (comboBoxOption !== 'Radio Button' && comboBoxOption !== 'Drop Down Combo') && 'w-[86%]',
                    )}>OPTION TITLE</span>
                    {(comboBoxOption === 'Radio Button' || comboBoxOption === 'Drop Down Combo') && (
                        <span className="w-[33%] text-xs grow">NEXT STEP</span>
                    )}
                    <span className="w-[13%] text-xs grow"></span>
                </div>
                <div className="flex flex-col gap-3 justify-between border border-gray-300 text-black w-full">
                    {
                        questionsOption.map((item, idx) => {
                            return (
                                <div key={idx} className="flex w-full hover:bg-gray-200 py-3 px-3">
                                    <span className={tw('text-xs grow',
                                        (comboBoxOption === 'Radio Button' || comboBoxOption === 'Drop Down Combo') && 'w-[53%]',
                                        (comboBoxOption !== 'Radio Button' && comboBoxOption !== 'Drop Down Combo') && 'w-[86%]',
                                    )}>{item.title}</span>
                                    {(comboBoxOption === 'Radio Button' || comboBoxOption === 'Drop Down Combo') && (
                                        <span className="w-[33%] text-xs grow">{getQuestionTypeName(item.next_question!)}</span>
                                    )}
                                    <div className="flex justify-center gap-3 w-[13%] grow">
                                        <icons.TrashIcon className="w-5 h-5" onClick={() => handleDeleteRowClick(item.order)} />
                                        <icons.ArrowUpIcon className="w-5 h-5" onClick={() => handleUpClick(item)} />
                                        <icons.ArrowDownIcon className="w-5 h-5" onClick={() => handleDownClick(item)} />
                                    </div>
                                </div>
                            )
                        }
                        )
                    }
                </div>
                <div className="flex items-center justify-center gap-4 py-3 px-3 text-black w-full h-16">
                    <span>Add New Option</span>
                    <Input
                        type="text"
                        id="new_option"
                        placeholder="Add a new option"
                        compact
                        onChange={(e) => handleInputOnChange(e)}
                        error={isInputEmpty && 'This field is required'}
                        containerClassName="h-full"
                        value={newInput}
                    />
                    {
                        (comboBoxOption === "Radio Button" || comboBoxOption === 'Drop Down Combo') && (
                            <ComboBox
                                id="questionType"
                                items={transformedSteps}
                                defaultValue={newQuestionType.name}
                                onValueChange={(item) => handleComboBoxChange(item)}
                                className="w-2/5"
                            />
                        )
                    }
                    <Button
                        variant="secondary"
                        onClick={() => handleAddRowClick(newInput, comboBoxOption)}
                    >
                        + Add
                    </Button>
                </div>
            </div>
        </div>
    )
}