import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Switch } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { truncateText } from "@/helpers/helpers";
import { Button, LoadingOverlay, Modal, icons } from '@/ui'
import { handleAxiosFieldErrors, tw } from '@/utils'
import type { Form, IHttpResponseError } from '@/api';
import { updateFormQuestions } from '@/api'
import type { Question } from '@/api';
import ComboBox from '@/ui/form/Combobox'
import { questionScreens } from './utils'
import { FormInstanceScreens } from '../instanceForm/components'
import type { FormInstanceFlow } from '../instanceForm'
import type { CompletedForm } from '@/api/formInstance'
import { useFormInstance } from '@/stores'
import { message } from '@/constants/message'

interface FormQuestionsProps {
    initialData: Form;
}
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const QuestionsForm: React.FC<FormQuestionsProps> = ({ initialData: form = {} }) => {
    const { id: formId } = useParams();
    let formQuestions = form.form_questions ?? [];
    const public_code = form.public_code;
    const navigate = useNavigate();

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

    // TODO - Order is undefined?
    formQuestions = formQuestions.sort((a, b) => a.order - b.order);

    const [questions, setQuestions] = useState(formQuestions);
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [currentQuestionOrder, setCurrentQuestionOrder] = useState(currentQuestion?.order);
    const [questionTypeForm, setQuestionTypeForm] = useState<keyof typeof questionScreens>(currentQuestion?.question_type_id as keyof typeof questionScreens ?? 1);
    const [comboBoxOption, setComboBoxOption] = useState<'Check Box' | 'Radio Button' | 'Drop Down Combo'>(getComboBoxOption(currentQuestion?.question_type_id as keyof typeof questionScreens));
    const [enabledIsMandatory, setEnabledIsMandatory] = useState<boolean>((currentQuestion?.is_mandatory ?? false) as boolean);

    const [PreviewForm, setPreviewForm] = useState<Form>({} as Form);
    const [showPreviewFormModal, setShowPreviewFormModal] = useState<boolean>(false);
    const [currentScreen, setCurrentScreen] = useState<FormInstanceFlow>({ questionType: 0, currentQuestionOrder: 1 });

    const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
    const [navigateBack, setNavigateBack] = useState<boolean>(false);

    useEffect(() => {
        setEnabledIsMandatory(currentQuestion?.is_mandatory as boolean);
        setComboBoxOption(getComboBoxOption(currentQuestion?.question_type_id as keyof typeof questionScreens));
        setCurrentQuestionOrder(currentQuestion?.order);
    }, [currentQuestion?.is_mandatory, currentQuestion?.question_type_id, currentQuestion?.order]);

    const handleAddQuestionClick = () => {
        const getLastQuestionOrder = Object.values(questions).pop()?.order;
        const lastQuestionOrder = getLastQuestionOrder ? getLastQuestionOrder + 1 : 1;
        const newElement: Question = { form_question_id: Number(formId), text: '', title: '', question_type_id: 1, question_type_name: 'Simple Text', is_mandatory: false, order: lastQuestionOrder, question_options: [] };
        setQuestions([...questions, newElement]);
        setCurrentQuestion(newElement);
    };

    const handleQuestionClick = (item: Question, order: number) => {
        setCurrentQuestion(item);
        setCurrentQuestionOrder(order);
        setQuestionTypeForm(item.question_type_id as keyof typeof questionScreens);
    }

    const QuestionTypeScreen = questionScreens[questionTypeForm];

    const FormInstance = FormInstanceScreens[currentScreen.questionType as 0 | 1 | 2 | 3 | 4 | 5 | 6];

    const handlePreviewClick = () => {
        // Clear state.
        useFormInstance.setState({ formInstance: null });
        // TODO - Check if this is the best way to do it.
        const initialFormData: CompletedForm = {
            form_id: Number(formId),
            initial_date_time: new Date,
            completer_user_first_name: "",
            completer_user_last_name: "",
            completer_user_email: "",
            completer_user_code: "",
            completed_questions_count: 0,
            public_code: public_code!,
            completed_questions: [],
            api_url: '',
            aux_code: '',
        };
        // console.log("initialFormData:", { initialFormData });
        useFormInstance.setState({
            formInstance: initialFormData,
            previewMode: true,
        })
        const formPreviewInfo: Form = {
            id: Number(formId),
            public_code: public_code!,
            name: form.name,
            description: form.description,
            logo: form.logo,
            is_active: form.is_active,
            is_initial_data_required: form.is_initial_data_required,
            is_user_responses_linked: form.is_user_responses_linked,
            welcome_text: form.welcome_text,
            final_text: form.final_text,
            primary_color: form.primary_color!,
            secondary_color: form.secondary_color!,
            rounded_style: form.rounded_style!,
            form_questions: questions,
        };
        setPreviewForm(formPreviewInfo);
        // Preview from current question
        setCurrentScreen({ questionType: (currentQuestion?.question_type_id ?? 0) as 0 | 1 | 2 | 3 | 4 | 5 | 6, currentQuestionOrder: currentQuestion?.order ?? 0 });
        setShowPreviewFormModal(true);

        // if (option === 0) {
        //     // Preview from beggining
        //     setCurrentScreen({ questionType: (questions.shift()!.question_type_id ?? 0) as 0 | 1 | 2 | 3 | 4 | 5 | 6, currentQuestionOrder: questions.shift()!.order ?? 0 });
        // } else {
        // // Preview from current question
        // setCurrentScreen({ questionType: (currentQuestion?.question_type_id ?? 0) as 0 | 1 | 2 | 3 | 4 | 5 | 6, currentQuestionOrder: currentQuestion?.order ?? 0 });
        // }
    }

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
        const updatedQuestions = questions?.map((question) => {
            if (question.order === currentQuestionOrder) {
                return {
                    ...question,
                    question_type_id: id,
                    question_type_name: questionTypes.find((questionType) => questionType.id === id)!.name,
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
        // Reorder questions
        newQuestions.map((question, index) => {
            question.order = index + 1;
        });
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

    const handleSaveClick = (option = 0) => {
        if (option === 0) {
            setNavigateBack(true);
        } else {
            setNavigateBack(false);
        }
        // console.log(questions);
        const data = questions;
        let error = false;
        data.map((question) => {
            question.form_question_id = Number(formId);
            // Change is_mandatory field from boolean to Number to fit endpoint.
            question.is_mandatory = question.is_mandatory === true ? 1 : question.is_mandatory === false ? 0 : question.is_mandatory;

            delete question.id;
            delete question.form_id;
            if ((!question.question_options || question.question_options.length === 0)
                && question.question_type_id !== 1 && question.question_type_id !== 2 && question.question_type_id !== 5) {
                toast.error('Please add options to the Check Box or Radio Button question.');
                error = true;
                return;
            }
            question.question_options?.map((option) => {
                delete option.id;
            });
        });

        //Check if there is a question with the same mapping_key of another question
        data.forEach((question) => {
            const mapping_key = question.mapping_key;
            if (mapping_key && mapping_key.length > 0) {
                const filtered = data.filter((question) => question.mapping_key === mapping_key);
                if (filtered.length > 1) {
                    toast.error('Mapping key must be unique.');
                    error = true;
                    return;
                }
            };
        });

        data.forEach((question) => {
            const title = question.title;
            if (title.length > 0) {
                const filtered = data.filter((question) => question.title === title);
                if (filtered.length > 1) {
                    toast.error('There are two or more equal titles, please change them and retry.');
                    error = true;
                    return;
                }
            };
        });
        console.log("error", error)
        if (error) {
            return;
        }
        // console.log('data', data);
        const postQuestions = { form_id: Number(formId), form_questions: data };
        console.log(postQuestions);
        updateFormQuestionsMutation(postQuestions);
    }

    const handleMandatoryChange = (checked: boolean) => {
        const updatedQuestions = questions?.map((question) => {
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
                toast.success(`Form Questions for Form "${public_code}" successfully updated!`);
                if (navigateBack) navigate(`/forms/${formId}`);
            },
            onError: (err: IHttpResponseError) => {
                if (err?.response?.data?.message) {
                    toast.error(err?.response.data.message);
                } else if (err?.response?.data?.error?.fields) {
                    const errors = err?.response.data.error.fields;
                    Object.entries(errors).length !== 0 && toast.error("Please make sure the mandatory fields [Title and Text to show] are filled.");

                } else {
                    toast.error("There was an error trying to update the form. Please try again later.");
                }
                handleAxiosFieldErrors(err, console.log);
            },
        });

    const handleClosePreviewFormModal = () => {
        setShowPreviewFormModal(false);
    };

    const handleCloseReturnModal = () => {
        setShowCancelModal(false);
    }

    return (
        <>
            {(isPendingUpdateFormQuestionsMutation) && (
                <LoadingOverlay />
            )}
            <div className="pb-6 h-[90%]">
                <Modal
                    className="items-center justify-center"
                    show={showPreviewFormModal}
                    title="Preview Form"
                    onClose={handleClosePreviewFormModal}
                >
                    <FormInstance formInstanceInfo={PreviewForm} setCurrentScreen={setCurrentScreen} currentScreen={currentScreen} />
                </Modal>
                <Modal
                    show={showCancelModal}
                    title="Cancel changes"
                    description={message.CANCEL_TEXT}
                    onClose={handleCloseReturnModal}
                >
                    <div className="flex h-16 p-3 m-auto">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex flex-row gap-4 h-16 p-3">
                                <Button aria-label="Cancel" variant="secondary" onClick={handleCloseReturnModal} >
                                    Cancel
                                </Button>
                                <Button aria-label="Confirm" variant="tertiary" onClick={() => navigate(`/forms/${formId}`)} >
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>
                <div className="bg-white flex items-center justify-between px-2 pb-4 text-base font-semibold leading-7">
                    <div className="flex gap-1 items-center">
                        <span className="pl-3 text-2xl text-black">
                            Form&apos;s Questions
                        </span>
                        {
                            public_code && (
                                <span className="text-2xl text-gray-500 italic">- Public Code: {public_code}</span>
                            )
                        }
                    </div>
                    <div className="flex gap-5">
                        <Button
                            variant="secondary"
                            onClick={() => setShowCancelModal(true)}
                        >
                            <icons.ArrowLeftIcon className={tw(`w-5 h-5`)} />
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="primary"
                            onClick={() => handleSaveClick(1)}
                        >
                            Save & Continue
                        </Button>
                        <Button
                            type="button"
                            variant="primary"
                            onClick={() => handleSaveClick(0)}
                        >
                            Save & Finish
                        </Button>
                    </div>
                </div>
                <div className="flex gap-3 w-full h-full">
                    <div className="bg-white shadow-lg pt-4 px-6 pb-2 border-[1px] rounded-xl w-[30%] overflow-scroll overflow-y-scroll">
                        <span>Questions list:</span>
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
                                                <div className="flex flex-col justify-center pl-3 ">
                                                    <span className={tw(`text-sm font-semibold`,
                                                        item.order === currentQuestion?.order && 'text-[#407EC9]',
                                                        item.order !== currentQuestion?.order && 'text-[#6B7280]'
                                                    )}
                                                    >
                                                        {truncateText(`Q-${item.order}:${item.title}`, 40)}
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
                                    <div className="flex justify-between pb-2">
                                        <div className="flex gap-2 items-center">
                                            <div>
                                                <Button
                                                    type="button"
                                                    variant="primary"
                                                    onClick={handlePreviewClick}
                                                >
                                                    Preview from here
                                                </Button>
                                            </div>
                                            <span className="text-sm font-medium">Question-{currentQuestionOrder}</span>
                                        </div>
                                        <div className="flex gap-2 items-center justify-end pb-2 grow">
                                            <span>Question Type</span>
                                            <ComboBox
                                                id="questionType"
                                                items={questionTypes}
                                                defaultValue={currentQuestion.question_type_name}
                                                onValueChange={(item) => handleComboboxChange(item.id as keyof typeof questionScreens)}
                                                className="w-2/5"
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                    <QuestionTypeScreen currentQuestion={currentQuestion} setQuestions={setQuestions} setCurrentQuestion={setCurrentQuestion} currentQuestionOrder={currentQuestionOrder} formQuestions={questions} comboBoxOption={comboBoxOption} />
                                    <div className="flex gap-3 pb-5 pl-2">
                                        <div className="flex w-40 items-center">
                                            <span>Mandatory question</span>
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
                                        <span className={classNames(enabledIsMandatory ? 'text-[#065F46]' : 'text-red-600', 'w-16')}>{enabledIsMandatory ? 'Yes' : 'No'}</span>
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
