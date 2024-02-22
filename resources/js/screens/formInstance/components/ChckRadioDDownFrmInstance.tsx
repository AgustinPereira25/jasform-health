import React, { useState } from 'react'

import { Button, Input } from '@/ui'
import ComboBox from '@/ui/form/Combobox';
import type { InstanceProps } from './FormInstanceScreens';
import type { CompletedQuestion, CompleterUserAnswerCheckedOption } from '@/api/formInstance';
import { useFormInstance } from '@/stores/useFormInstance';
import type { Question, QuestionsOption } from '@/api';

export const ChckRadioDDownFrmInstance: React.FC<InstanceProps> = ({ formInstanceInfo, currentScreen, setCurrentScreen }) => {
    const currentState = useFormInstance.getState().formInstance!;
    const currentQuestionInfo: Question = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder) ?? {} as Question;

    const questiontypeId = currentScreen.questionType;
    const [error, setError] = useState<string>('');
    const [answerInput, setAnswerInput] = useState<string>('');
    const [checkedAnswers, setCheckedAnswers] = useState<CompleterUserAnswerCheckedOption[]>([]);

    const [comboBoxItems, setComboBoxItems] = useState<{ id: number, name: string }[]>([]);
    if (questiontypeId === 5) {
        const items = currentQuestionInfo.questions_options?.map((option) => ({ id: option.id, name: option.title })) ?? [];
        setComboBoxItems(items);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (questiontypeId !== 3) { // Dropdown and Radio
            if (currentQuestionInfo.is_obligatory && !answerInput) {
                setError('Answer is mandatory');
            }
            if (!error) {
                const answer: CompletedQuestion = {
                    id: currentQuestionInfo.id,
                    title: currentQuestionInfo.title,
                    completer_user_answer: answerInput,
                    order: currentQuestionInfo.order,
                    is_obligatory: currentQuestionInfo.is_obligatory,
                    question_type_id: currentQuestionInfo.question_type_id,
                    question_type_name: currentQuestionInfo.question_type_name,
                };
                useFormInstance.setState({ formInstance: { ...currentState, completed_questions: [...currentState.completed_questions, answer] } });
                const nextQuestionType: number = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder + 1)?.question_type_id ?? 6;
                setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder + 1 });
            }
        }
        else { // Checkbox
            console.log('checkedAnswers', checkedAnswers);
            console.log('obligatory', currentQuestionInfo.is_obligatory);
            console.log('checkedAnswers.length', checkedAnswers.length);
            if (currentQuestionInfo.is_obligatory && checkedAnswers.length === 0) {
                setError('Answer is mandatory');
            }
            else {
                const answer: CompletedQuestion = {
                    id: currentQuestionInfo.id,
                    title: currentQuestionInfo.title,
                    completer_user_answer: "",
                    order: currentQuestionInfo.order,
                    is_obligatory: currentQuestionInfo.is_obligatory,
                    question_type_id: currentQuestionInfo.question_type_id,
                    question_type_name: currentQuestionInfo.question_type_name,
                    completer_user_answer_checked_options: checkedAnswers,
                };
                useFormInstance.setState({ formInstance: { ...currentState, completed_questions: [...currentState.completed_questions, answer] } });
                const nextQuestionType: number = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder + 1)?.question_type_id ?? 6;
                setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder + 1 });
            }
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        if (questiontypeId === 3) { //CheckBox
            // id:               number;
            // order:            number;
            // title:            string;
            // next_question:    number;
            // form_question_id: number;
            const option: QuestionsOption = currentQuestionInfo.questions_options?.find((option) => option.order === Number(value)) ?? {} as QuestionsOption;
            if (checked) {
                setError('');
                setCheckedAnswers([...checkedAnswers, { id: option.id, order: option.order, title: option.title, next_question: option.next_question, form_question_id: option.form_question_id }]);
            } else {
                setCheckedAnswers(checkedAnswers.filter((answer) => answer.order !== Number(value)));
            }
        } else {
            setAnswerInput(value);
        }
    }
    const handleGoBackClick = () => {
        const nextQuestionType: number = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder - 1)?.question_type_id ?? 0;
        setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder - 1 });
    }
    return (
        <div id="chck-radio-container-form-div" className="bg-gray-300 p-6 border rounded-xl">
            <span>{`${currentQuestionInfo.title}: ${currentQuestionInfo.text}`}</span>
            <form id="chck-radio-container-form-form" className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
                <div className="flex flex-col pt-6 pb-20 gap-4">

                    {
                        questiontypeId === 3 ? (
                            <>
                                {
                                    currentQuestionInfo.questions_options?.map((option) => (
                                        <div key={option.order} className="flex items-center gap-3">
                                            <Input
                                                compact
                                                type="checkbox"
                                                name={option.title}
                                                id={`chck-radio-answer-checkbox-${option.id}`}
                                                value={option.order}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor={`chck-radio-answer-checkbox-${option.id}`}>{option.title}</label>
                                        </div>
                                    ))
                                }
                                <div className="flex items-center justify-center h-10">
                                    {error && (<span className="text-red-500">{error}</span>)}
                                </div>
                            </>
                        ) : questiontypeId === 4 ? (
                            <>
                                {
                                    currentQuestionInfo.questions_options?.map((option) => (
                                        <div key={option.order} className="flex items-center gap-3">
                                            <Input
                                                compact
                                                type="radio"
                                                name="answer"
                                                id={`chck-radio-answer-radio-${option.id}`}
                                                value={option.id}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor={`chck-radio-answer-radio-${option.id}`}>{option.title}</label>
                                        </div>
                                    ))
                                }
                            </>
                        ) : (
                            <ComboBox
                                id="chck-radio-answer-dropdown"
                                // items={[{ id: 1, name: 'Mock Answer 1' }, { id: 2, name: 'Mock Answer 2' }, { id: 3, name: 'Mock Answer 3' }]}
                                items={comboBoxItems}
                                defaultValue={comboBoxItems[0]?.name}
                                // onValueChange={(item) => handleComboboxChange(item.id as keyof typeof questionScreens)}
                                onValueChange={(item) => setAnswerInput(item.name)}
                            />
                        )
                    }
                </div>
                <div className="flex justify-between">
                    <Button variant="secondary" type="button" id="goBack-answer-btn" onClick={handleGoBackClick}>Atrás</Button>
                    <Button type="submit" id="submit-answer-btn">Siguiente</Button>
                </div>
            </form>
        </div >
    )
}
