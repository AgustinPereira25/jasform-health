import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Switch } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { Button, LoadingOverlay, icons } from '@/ui'
import { handleAxiosFieldErrors, tw } from '@/utils'
import type { IHttpResponseError } from '@/api';
import { updateFormQuestions } from '@/api'
import type { Question } from '@/api';
import ComboBox from '@/ui/form/Combobox'
import { questionScreens } from './utils'

interface FormQuestionsProps {
    initialData: Question[];
}
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const QuestionsForm: React.FC<FormQuestionsProps> = ({ initialData: formQuestions = [] }) => {

    // TODO- Put this in constants file
    const questionTypes = [
        { id: 1, name: "Simple Text" },
        { id: 2, name: "Input Field" },
        { id: 3, name: "Multiple Choice - Check Box" },
        { id: 4, name: "Single Option - Radio Button" },
        { id: 5, name: "Single Option - Drop Down Combo" },
    ];

    const getComboBoxOption = (id: keyof typeof questionScreens) => {
        switch (id) {
            case 3:
                return 'Check Box';
            case 4:
                return 'Radio Button';
            case 5:
                return 'Drop Down Combo';
            default:
                return 'Check Box';
        }
    };

    const { id: formId } = useParams();
    const navigate = useNavigate();

    // TODO - Order is undefined?
    formQuestions = formQuestions.sort((a, b) => a.order - b.order);

    const [questions, setQuestions] = useState(formQuestions);
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [currentQuestionOrder, setCurrentQuestionOrder] = useState(currentQuestion?.order);
    const [questionTypeForm, setQuestionTypeForm] = useState<keyof typeof questionScreens>(currentQuestion?.question_type_id as keyof typeof questionScreens ?? 1);
    const [comboBoxOption, setComboBoxOption] = useState<'Check Box' | 'Radio Button' | 'Drop Down Combo'>(getComboBoxOption(currentQuestion?.question_type_id as keyof typeof questionScreens));
    const [enabledIsMandatory, setEnabledIsMandatory] = useState<boolean>((currentQuestion?.is_mandatory ?? false) as boolean);

    useEffect(() => {
        setEnabledIsMandatory(currentQuestion?.is_mandatory as boolean);
        setComboBoxOption(getComboBoxOption(currentQuestion?.question_type_id as keyof typeof questionScreens));
    }, [currentQuestion?.is_mandatory, currentQuestion?.question_type_id]);

    const handleAddQuestionClick = () => {
        const getLastQuestionOrder = Object.values(questions).pop()?.order;
        const lastQuestionOrder = getLastQuestionOrder ? getLastQuestionOrder + 1 : 1;
        const newElement: Question = { form_question_id: Number(formId), text: '', title: '', question_type_id: 1, question_type_name: 'Simple Text', is_mandatory: false, order: lastQuestionOrder };
        setQuestions([...questions, newElement]);
    };

    const handleQuestionClick = (item: Question, order: number) => {
        setCurrentQuestion(item);
        setCurrentQuestionOrder(order);
        setQuestionTypeForm(item.question_type_id as keyof typeof questionScreens);
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
        // Update the formQuestions general state
        const updatedQuestions = formQuestions?.map((question) => {
            if (question.order === currentQuestionOrder) {
                return {
                    ...question,
                    question_type_id: questionTypeForm,
                    question_type_name: questionTypes.find((questionType) => questionType.id === questionTypeForm)!.name,
                };
            }
            return question;
        });
        const updatedQuestion = updatedQuestions?.find((question) => question.order === currentQuestionOrder);
        setQuestions(updatedQuestions ?? []);
        // console.log('questionTypeForm', questionTypeForm)
        // console.log(updatedQuestion);
        setCurrentQuestion(updatedQuestion);
    }

    const handleDeleteClick = (item: Question) => {
        const newQuestions = questions.filter((question) => question.order !== item.order);
        setQuestions(newQuestions);
    }

    const handleUpClick = (item: Question) => {
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

    const handleDownClick = (item: Question) => {
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

    const handleSaveClick = () => {
        // console.log(questions);
        const data = questions;
        data.map((question) => {
            question.form_question_id = Number(formId);
            // Change is_mandatory field from boolean to Number to fit endpoint.
            question.is_mandatory = question.is_mandatory === true ? 1 : question.is_mandatory === false ? 0 : question.is_mandatory;

            delete question.id;
            delete question.form_id;
            // TODO - Delete id and form_question_id from question_options to fit endpoint.
            question.question_options?.map((option) => {
                delete option.id;
                delete option.form_question_id;
            });
        });
        // console.log('data', data)
        const postQuestions = { form_id: Number(formId), form_questions: data };
        console.log(postQuestions);
        // updateFormQuestionsMutation(postQuestions);
    }

    const handleMandatoryChange = (checked: boolean) => {
        const updatedQuestions = formQuestions?.map((question) => {
            if (question.order === currentQuestionOrder) {
                return {
                    ...question,
                    is_mandatory: checked,
                };
            }
            return question;
        });
        const updatedQuestion = updatedQuestions?.find((question) => question.order === currentQuestionOrder);
        setQuestions(updatedQuestions ?? []);
        setCurrentQuestion(updatedQuestion);
        setEnabledIsMandatory(checked);
    }

    const queryClient = useQueryClient();
    const { mutate: updateFormQuestionsMutation, isPending: isPendingUpdateFormQuestionsMutation } =
        useMutation({
            mutationFn: updateFormQuestions.mutation,
            onSuccess: () => {
                updateFormQuestions.invalidates(queryClient);
                toast.success(`Form Questions for Form "${formId}" successfully updated!`);
                navigate(`/forms/${formId}`);
            },
            onError: (err: IHttpResponseError) => {
                if (err?.response?.data?.message) {
                    toast.error(err?.response.data.message);
                } else if (err?.response?.data?.error?.fields) {
                    const errors = err?.response.data.error.fields;
                    Object.entries(errors).forEach(([_, valArray]) => {
                        toast.error(`${valArray[0]}`);
                    });
                } else {
                    toast.error("There was an error trying to update the user. Please try again later.");
                }
                handleAxiosFieldErrors(err, console.log);
            },
        });

    return (
        <>
            {(isPendingUpdateFormQuestionsMutation) && (
                <LoadingOverlay />
            )}
            <div className="pb-6 h-[90%]">
                <div className="bg-white flex items-center justify-between px-2 pb-4 text-base font-semibold leading-7">
                    <div className="flex gap-1 items-center">
                        <Button
                            variant="secondary"
                            onClick={() => navigate(`/forms/${formId}`)}
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
                            type="button"
                            variant="primary"
                            onClick={handleSaveClick}
                        >
                            Save
                        </Button>
                    </div>
                </div>
                <div className="flex gap-3 w-full h-full">
                    <div className="bg-white shadow-lg pt-4 px-6 pb-2 border-[1px] rounded-xl w-[30%] overflow-scroll">
                        <span>Content</span>
                        <div className="flex flex-col items-center">
                            {
                                questions.map((item, idx) => {
                                    return (
                                        <div
                                            id={item.order?.toString()}
                                            key={item.order}
                                            className="flex relative w-full items-center hover:bg-gray-50"
                                            onClick={() => handleQuestionClick(item, item.order)}
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
                                <div className="h-full flex flex-col overflow-scroll">
                                    <div className="flex justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">Question {currentQuestionOrder}</span>
                                        </div>
                                        <div className="flex gap-2 items-center pb-2">
                                            <span>Question Type</span>
                                            <ComboBox
                                                id="questionType"
                                                items={questionTypes}
                                                defaultValue={currentQuestion.question_type_name}
                                                onValueChange={(item) => handleComboboxChange(item.id as keyof typeof questionScreens)}
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                    <QuestionTypeScreen currentQuestion={currentQuestion} setQuestions={setQuestions} currentQuestionOrder={currentQuestionOrder} formQuestions={questions} comboBoxOption={comboBoxOption} />
                                    <div className="flex gap-3 pb-5 pl-2">
                                        <div className="flex w-40 items-center">
                                            <span>Mandatory Question</span>
                                        </div>
                                        <Switch.Group as="div" className="flex items-center justify-between gap-2">
                                            <Switch
                                                checked={enabledIsMandatory}
                                                onChange={(e) => handleMandatoryChange(e)}
                                                className={classNames(
                                                    enabledIsMandatory ? 'bg-[#065F46]' : 'bg-gray-200',
                                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00519E] focus:ring-offset-2'
                                                )}
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        enabledIsMandatory ? 'translate-x-5' : 'translate-x-0',
                                                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                    )}
                                                />
                                            </Switch>
                                        </Switch.Group>
                                        <span className={classNames(enabledIsMandatory ? 'text-[#065F46]' : 'text-red-600', 'w-16')}>{enabledIsMandatory ? 'Active' : 'Inactive'}</span>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuestionsForm;
