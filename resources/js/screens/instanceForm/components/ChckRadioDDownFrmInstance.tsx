import React, { useEffect, useMemo, useState } from 'react'

import { Button, Input, Modal } from '@/ui'
import ComboBox from '@/ui/form/Combobox';
import type { InstanceProps } from './FormInstanceScreens';
import type { CompletedQuestion, CompleterUserAnswerCheckedOption } from '@/api/formInstance';
import { useFormInstance } from '@/stores/useFormInstance';
import type { Question, QuestionsOption } from '@/api';
import { message } from '@/constants/message';
import { adjustHoverColor, getColorContrast } from '@/helpers/helpers';

export const ChckRadioDDownFrmInstance: React.FC<InstanceProps> = ({ formInstanceInfo, currentScreen, setCurrentScreen }) => {
    const currentState = useFormInstance.getState().formInstance!;
    const currentQuestionInfo: Question = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder) ?? {} as Question;

    const currentStateQuestionInfo: CompletedQuestion = currentState.completed_questions?.find((question) => question.order === currentScreen.currentQuestionOrder) ?? {} as CompletedQuestion;

    const questiontypeId = currentScreen.questionType;
    const [error, setError] = useState<string>('');

    // const savedAnswerInput = currentState.completed_questions?.find((question) => question.order === currentScreen.currentQuestionOrder)?.answer ?? '';
    const savedAnswerInput = currentStateQuestionInfo.answer ?? '';
    const [answerInput, setAnswerInput] = useState<string>(savedAnswerInput);

    const [valueInput, setValueInput] = useState<string>('');

    const [showDeletionModal, setShowDeletionModal] = useState(false);

    const [isCompleted, setIsCompleted] = useState(currentStateQuestionInfo.is_completed ?? false);

    const handleCloseDeletionModal = () => {
        setShowDeletionModal(false);
        setIsCompleted(false);
    };

    useEffect(() => {
        setAnswerInput(savedAnswerInput);
        setError('');
    }, [savedAnswerInput, currentScreen.currentQuestionOrder]);

    const savedAnswerCheckedOptions = useMemo(
        () => currentState.completed_questions?.find((question) => question.order === currentScreen.currentQuestionOrder)?.completer_user_answer_checked_options ?? [],
        [currentScreen.currentQuestionOrder, currentState.completed_questions]
    );

    useEffect(() => {
        const items = currentQuestionInfo.question_options?.map((option) => ({ id: option.id!, name: option.title })) ?? [];
        setAnswerInput(savedAnswerInput ? savedAnswerInput : items[0]!.name);
        setComboBoxItems(items);
        setCheckedAnswers(savedAnswerCheckedOptions);
    }, [currentQuestionInfo.order, currentQuestionInfo.question_options, currentQuestionInfo.question_type_id])

    console.log('currentQuestionInfo', currentQuestionInfo)
    // console.log("savedAnswerCheckedOptions", savedAnswerCheckedOptions)
    const [checkedAnswers, setCheckedAnswers] = useState<CompleterUserAnswerCheckedOption[]>(savedAnswerCheckedOptions);

    // console.log('currentState.completed_questions', currentState.completed_questions);
    const [comboBoxItems, setComboBoxItems] = useState<{ id: number, name: string }[]>([]);

    // Hover colors
    const [hoveredPrimary, setHoveredPrimary] = useState(false);
    const [hoveredSecondary, setHoveredSecondary] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const currentState = useFormInstance.getState().formInstance!;
        if (questiontypeId !== 3) { // Dropdown and Radio
            if (currentQuestionInfo.is_mandatory && !answerInput) {
                setError('Answer is mandatory');
                return;
            }

            if (!error) {
                let nextQuestionTypeRadio = 0;
                let nextQuestionTypeRadioOrder = 0;
                if (questiontypeId === 4 || questiontypeId === 5) // Radio Button or Drop Down
                {
                    const next_question = currentQuestionInfo.question_options?.find((option) => option.title === answerInput)?.next_question;
                    console.log('next_question', next_question);
                    console.log('answerInput', answerInput);
                    switch (next_question) {
                        case 0:
                            nextQuestionTypeRadio = 6; // Finish form instance.
                            break;
                        case -1:
                            // Find next question type by increasing current order.
                            nextQuestionTypeRadio = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder + 1)?.question_type_id ?? 6;
                            nextQuestionTypeRadioOrder = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder + 1)?.order ?? 0;
                            break;
                        default:
                            nextQuestionTypeRadioOrder = next_question!; // next question order
                            nextQuestionTypeRadio = formInstanceInfo.form_questions?.find((question) => question.order === nextQuestionTypeRadioOrder)?.question_type_id ?? 6;
                            if (nextQuestionTypeRadio === 0) {
                                // If next question is not found because its deleted, find next question by increasing current order.
                                nextQuestionTypeRadio = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder + 1)?.question_type_id ?? 6;
                                nextQuestionTypeRadio = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder + 1)?.order ?? 0;
                            }
                            break;
                    }
                }
                setIsCompleted(true);
                console.log('nextQuestionTypeRadio', nextQuestionTypeRadio);
                const answer: CompletedQuestion = {
                    id: currentQuestionInfo.id!,
                    title: currentQuestionInfo.title,
                    text: currentQuestionInfo.text,
                    answer: answerInput,
                    order: currentQuestionInfo.order,
                    is_mandatory: currentQuestionInfo.is_mandatory as boolean,
                    question_type_id: currentQuestionInfo.question_type_id,
                    question_type_name: currentQuestionInfo.question_type_name,
                    is_completed: true,
                    mapping_key: currentQuestionInfo.mapping_key,
                };
                if (!currentState.completed_questions.find((question) => question.order === answer.order)) {
                    useFormInstance.setState({ formInstance: { ...currentState, completed_questions: [...currentState.completed_questions, answer] } });
                }
                else {
                    if (currentState.completed_questions.find((question) => question.order === answer.order)?.answer !== answer.answer) {
                        const newCompletedQuestions = currentState.completed_questions.map((question) => question.order === answer.order ? answer : question);
                        useFormInstance.setState({ formInstance: { ...currentState, completed_questions: newCompletedQuestions } });
                    }
                }
                // TODO - Refactor this code to a function.
                // in this function changes question order (nextQuestionTypeRadio or currentScreen.currentQuestionOrder + 1)
                let nextQuestionOrder = currentScreen.currentQuestionOrder + 1;
                if (nextQuestionTypeRadio !== 6) {
                    nextQuestionOrder = nextQuestionTypeRadioOrder
                }

                //In this function only changes question order for finding next question type.
                let nextQuestionType = 0;
                switch (nextQuestionTypeRadio) {
                    case 6:
                        nextQuestionType = 6; // finish form isntance (radio or drop down)
                        break;
                    case 0: // Isnt radio or drop down (default next step)
                        nextQuestionType = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder + 1)?.question_type_id ?? 6;
                        break;
                    default: // Is radio or drop down, but with next_question (not default or go to end)
                        nextQuestionType = nextQuestionTypeRadio;
                        break;
                }
                console.log('nextQuestionType', nextQuestionType)
                console.log('nextQuestionOrder', nextQuestionOrder)
                setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: nextQuestionOrder });
            }
        }
        else { // Checkbox
            // console.log('checkedAnswers', checkedAnswers);
            // console.log('mandatory', currentQuestionInfo.is_mandatory);
            // console.log('checkedAnswers.length', checkedAnswers.length);
            if (currentQuestionInfo.is_mandatory && checkedAnswers.length === 0) {
                setError('Answer is mandatory');
            }
            else {
                const answer: CompletedQuestion = {
                    id: currentQuestionInfo.id!,
                    title: currentQuestionInfo.title,
                    text: currentQuestionInfo.text,
                    answer: "",
                    order: currentQuestionInfo.order,
                    is_mandatory: currentQuestionInfo.is_mandatory as boolean,
                    question_type_id: currentQuestionInfo.question_type_id,
                    question_type_name: currentQuestionInfo.question_type_name,
                    completer_user_answer_checked_options: checkedAnswers,
                    mapping_key: currentQuestionInfo.mapping_key,
                };
                if (!currentState.completed_questions.find((question) => question.order === answer.order)) {
                    useFormInstance.setState({ formInstance: { ...currentState, completed_questions: [...currentState.completed_questions, answer] } });
                }
                else {
                    if (currentState.completed_questions.find((question) => question.order === answer.order)?.completer_user_answer_checked_options !== answer.completer_user_answer_checked_options) {
                        const newCompletedQuestions = currentState.completed_questions.map((question) => question.order === answer.order ? answer : question);
                        useFormInstance.setState({ formInstance: { ...currentState, completed_questions: newCompletedQuestions } });
                    }
                }
                // TODO - Test checkbox option and Radio button
                // Check if there is an answer for the current question
                // const updatedState = currentState.completed_questions.filter((question) => question.order !== currentScreen.currentQuestionOrder);
                // useFormInstance.setState({ formInstance: { ...currentState, completed_questions: [...updatedState, answer] } });

                const nextQuestionType: number = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder + 1)?.question_type_id ?? 6;
                console.log('nextQuestionType', nextQuestionType);
                console.log('nextQuestionOrder', currentScreen.currentQuestionOrder + 1);

                setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder + 1 });
            }
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, comboOptionName = '') => {
        const { value, checked } = e.target;

        if (questiontypeId === 3) { //CheckBox
            // id:               number;
            // order:            number;
            // title:            string;
            // next_question:    number;
            // form_question_id: number;
            const option: QuestionsOption = currentQuestionInfo.question_options?.find((option) => option.title.toUpperCase() === value.toUpperCase()) ?? {} as QuestionsOption;
            if (checked) {
                setError('');
                // setCheckedAnswers([...checkedAnswers, { id: option.id!, order: option.order, title: option.title, next_question: option.next_question!, form_question_id: option.form_question_id! }]);
                // TODO - Check this
                setCheckedAnswers([...checkedAnswers, { id: option.id!, order: option.order, title: option.title, next_question: option.next_question! }]);
            } else {
                setCheckedAnswers(checkedAnswers.filter((answer) => answer.title.toUpperCase() !== value.toUpperCase()));
            }
        } else {
            if (comboOptionName) {
                // DropDown Combo
                console.log('answerInput', answerInput);
                console.log('comboOptionName', comboOptionName);
                console.log('isCompleted', isCompleted);
                if (isCompleted && answerInput !== comboOptionName && answerInput) {
                    const nextQuestionAnswerInput = currentQuestionInfo.question_options?.find((option) => option.title === answerInput)?.next_question;
                    const nextQuestionValue = currentQuestionInfo.question_options?.find((option) => option.title === comboOptionName)?.next_question;

                    if (nextQuestionAnswerInput !== nextQuestionValue) {
                        // Show modal to confirm answer change
                        setShowDeletionModal(true);
                        setValueInput(comboOptionName);
                        setError('');
                    }
                } else {
                    setAnswerInput(comboOptionName);
                    setError('');
                }
            } else {
                // Radio button
                console.log('answerInput', answerInput)
                console.log('value', value)
                if (isCompleted && answerInput !== value && answerInput) {
                    const nextQuestionAnswerInput = currentQuestionInfo.question_options?.find((option) => option.title === answerInput)?.next_question;
                    const nextQuestionValue = currentQuestionInfo.question_options?.find((option) => option.title === value)?.next_question;

                    if (nextQuestionAnswerInput !== nextQuestionValue) {
                        // Show modal to confirm answer change
                        setShowDeletionModal(true);
                        setValueInput(value);
                    } else {
                        setAnswerInput(value);
                    }
                    setError('');
                } else {
                    setAnswerInput(value);
                    setError('');
                }
            }
        }
    }
    const handleDelete = () => {
        setAnswerInput(valueInput);
        const updatedState = currentState.completed_questions.slice(0, currentQuestionInfo.order - 1);
        console.log('updatedState', updatedState);
        useFormInstance.setState({ formInstance: { ...currentState, completed_questions: updatedState } });
        setShowDeletionModal(false);
    }
    const handleGoBackClick = () => {
        const nextQuestionType: number = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder - 1)?.question_type_id ?? 0;
        setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder - 1 });
    }

    const hoverColorPrimary = adjustHoverColor(formInstanceInfo.primary_color);
    const hoverColorSecondary = adjustHoverColor(formInstanceInfo.secondary_color);

    return (
        <div id="chck-radio-container-form-div" className="flex flex-col grow max-w-[400px] h-full max-h-[400px] bg-white p-6 border rounded-xl gap-3 overflow-y-auto">
            <div className="flex flex-col justify-center gap-2">
                <h1 className="font-semibold">{`${currentQuestionInfo.title}`}</h1>
                <p>{`${currentQuestionInfo.text}`}</p>
            </div>
            <Modal
                show={showDeletionModal}
                title="Confirm answer change"
                description={message.MODAL_DELETE_ALL_NEXT_QUESTIONS}
                onClose={handleCloseDeletionModal}
            >
                <div className="flex h-16 p-3 m-auto">
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-row gap-4 h-16 p-3">
                            <Button aria-label="Cancel" variant="secondary" onClick={handleCloseDeletionModal} >
                                Cancel
                            </Button>
                            <Button aria-label="Confirm" variant="tertiary" onClick={handleDelete} >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>

            <form id="chck-radio-container-form-form" className="flex flex-col justify-between grow overflow-y-auto" onSubmit={handleSubmit}>

                {
                    questiontypeId === 3 ? (
                        <>
                            <div className="flex flex-col pt-3 pb-3 gap-4 overflow-y-auto whitespace-pre-wrap">
                                {
                                    currentQuestionInfo.question_options?.map((option) => (
                                        <div key={option.title} className="flex items-center gap-3">
                                            <Input
                                                compact
                                                type="checkbox"
                                                name={option.title}
                                                id={`chck-radio-answer-checkbox-${option.id}`}
                                                value={option.title}
                                                onChange={handleChange}
                                                checked={checkedAnswers.some((answer) => answer.title.toLowerCase() === option.title.toLowerCase())}
                                            />
                                            <label className="break-words" htmlFor={`chck-radio-answer-checkbox-${option.id}`}>{option.title}</label>
                                        </div>
                                    ))
                                }
                                <div className="flex items-center justify-center h-10">
                                    {error && (<span className="text-red-500">{error}</span>)}
                                </div>

                            </div>

                        </>
                    ) : questiontypeId === 4 ? (
                        <>
                            <div className="flex flex-col pt-3 pb-3 gap-4 overflow-y-auto whitespace-pre-wrap break-all">
                                {
                                    currentQuestionInfo.question_options?.map((option) => (
                                        <div key={option.title} className="flex items-center gap-5">
                                            <Input
                                                compact
                                                type="radio"
                                                name="answer"
                                                id={`chck-radio-answer-radio-${option.id}`}
                                                value={option.title}
                                                onChange={handleChange}
                                                checked={answerInput === option.title}
                                            />
                                            <label htmlFor={`chck-radio-answer-radio-${option.id}`}>{option.title}</label>
                                        </div>
                                    ))
                                }
                                <div className="flex items-center justify-center h-10">
                                    {error && (<span className="text-red-500">{error}</span>)}
                                </div>

                            </div>

                        </>
                    ) : (
                        <div className="h-full flex flex-col pt-3 pb-3 gap-4 overflow-y-auto whitespace-pre-wrap break-all">

                            <ComboBox
                                id="chck-radio-answer-dropdown"
                                // items={[{ id: 1, name: 'Mock Answer 1' }, { id: 2, name: 'Mock Answer 2' }, { id: 3, name: 'Mock Answer 3' }]}
                                items={comboBoxItems}
                                defaultValue={!answerInput ? comboBoxItems[0]?.name : answerInput}
                                // onValueChange={(item) => handleComboboxChange(item.id as keyof typeof questionScreens)}

                                // onValueChange={(item) => setAnswerInput(item.name)}
                                // TODO - TEST THIS IN INSTANCE FORM
                                onValueChange={(item) => {
                                    const event = {
                                        target: {
                                            name: '',
                                            value: item.name
                                        }
                                    } as React.ChangeEvent<HTMLInputElement>;
                                    handleChange(event, event.target.value);
                                }}
                            />
                        </div>

                    )
                }
                <div className="flex justify-between gap-8 p-1">
                    <Button
                        aria-label="Back"
                        variant="secondary"
                        type="button"
                        id="goBack-answer-btn"
                        onClick={handleGoBackClick}
                        style={{
                            backgroundColor: hoveredSecondary ? hoverColorSecondary : formInstanceInfo.secondary_color,
                            border: formInstanceInfo.rounded_style ? 1 : 'none',
                            borderRadius: formInstanceInfo.rounded_style ?? 'none',
                            color: getColorContrast(formInstanceInfo.secondary_color),
                            // borderColor: primaryColor.startsWith("#e") || primaryColor.startsWith("#fff") ? 'black' : 'white',
                        }}
                        onMouseEnter={() => setHoveredSecondary(true)}
                        onMouseLeave={() => setHoveredSecondary(false)}
                    >
                        Back
                    </Button>
                    <Button
                        aria-label="Next"
                        type="submit"
                        id="submit-answer-btn"
                        style={{
                            backgroundColor: hoveredPrimary ? hoverColorPrimary : formInstanceInfo.primary_color,
                            border: formInstanceInfo.rounded_style ? 1 : 'none',
                            borderRadius: formInstanceInfo.rounded_style ?? 'none',
                            color: getColorContrast(formInstanceInfo.primary_color),
                        }}
                        onMouseEnter={() => setHoveredPrimary(true)}
                        onMouseLeave={() => setHoveredPrimary(false)}
                    >
                        Next
                    </Button>
                </div>
            </form>
        </div >
    )
}
