import React, { useEffect, useState } from 'react'

import type { CompletedQuestion } from '@/api/formInstance';
import { useFormInstance } from '@/stores/useFormInstance';
import { Button, Input } from '@/ui'
import type { InstanceProps } from '.';
import type { Question } from '@/api';

export const InputFieldFrmInstance: React.FC<InstanceProps> = ({ formInstanceInfo, currentScreen, setCurrentScreen }) => {
    const currentState = useFormInstance.getState().formInstance!;

    const [error, setError] = useState<string>('');

    const savedAnswer = currentState.completed_questions?.find((question) => question.order === currentScreen.currentQuestionOrder)?.answer ?? '';
    const [answerInput, setAnswerInput] = useState<string>(savedAnswer);

    useEffect(() => {
        setAnswerInput(savedAnswer);
    }, [savedAnswer, currentScreen.currentQuestionOrder]);

    const currentQuestionInfo: Question = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder) ?? {} as Question;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentQuestionInfo.is_mandatory === true && !answerInput) {
            setError('Answer is mandatory');
            return;
        }
        if (!error) {
            const answer: CompletedQuestion = {
                id: currentQuestionInfo.id!,
                title: currentQuestionInfo.title,
                answer: answerInput,
                order: currentQuestionInfo.order,
                is_mandatory: currentQuestionInfo.is_mandatory as boolean,
                question_type_id: currentQuestionInfo.question_type_id,
                question_type_name: currentQuestionInfo.question_type_name,
            };
            useFormInstance.setState({ formInstance: { ...currentState, completed_questions: [...currentState.completed_questions, answer] } });
            const nextQuestionType: number = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder + 1)?.question_type_id ?? 6;
            setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder + 1 });
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setAnswerInput(value);
        setError('');
    }
    const handleGoBackClick = () => {
        const nextQuestionType: number = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder - 1)?.question_type_id ?? 0;
        setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder - 1 });
    }
    return (
        <div id="input-field-container-form-div" className="bg-white p-7 border rounded-xl max-w-md w-[30%]">
            <div className="flex flex-col justify-center gap-2">
                <span>{`${currentQuestionInfo.title}`}</span>
                <span>{`${currentQuestionInfo.text}`}</span>
            </div>
            <form id="input-field-container-form-form" className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
                <div className="flex flex-col pt-6 pb-20 gap-4">
                    <Input
                        type="text"
                        name="answer"
                        id="input-field-answer"
                        placeholder="Tu Respuesta"
                        error={error && error}
                        value={answerInput}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-between">
                    <Button variant="secondary" type="button" id="goBack-answer-btn" onClick={handleGoBackClick} style={{
                        backgroundColor: formInstanceInfo.secondary_color,
                        border: formInstanceInfo.rounded_style ? 1 : 'none',
                        borderRadius: formInstanceInfo.rounded_style ?? 'none',
                        color: formInstanceInfo.secondary_color ? formInstanceInfo.secondary_color.startsWith("#e") || formInstanceInfo.secondary_color.startsWith("#f") ? 'black' : 'white' : 'black',
                        // borderColor: primaryColor.startsWith("#e") || primaryColor.startsWith("#fff") ? 'black' : 'white',
                    }}
                    >
                        Atrás
                    </Button>
                    <Button
                        type="submit"
                        id="submit-answer-btn"
                        style={{
                            backgroundColor: formInstanceInfo.primary_color,
                            border: formInstanceInfo.rounded_style ? 1 : 'none',
                            borderRadius: formInstanceInfo.rounded_style ?? 'none',
                            color: formInstanceInfo.primary_color ? formInstanceInfo.primary_color.startsWith("#e") || formInstanceInfo.primary_color.startsWith("#f") ? 'black' : 'white' : 'black',
                        }}
                    >
                        Siguiente
                    </Button>
                </div>
            </form>
        </div>
    )
}
