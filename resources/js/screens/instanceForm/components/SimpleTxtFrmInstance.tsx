import React, { useEffect, useState } from 'react'

import type { CompletedQuestion } from '@/api/formInstance';
import { useFormInstance } from '@/stores/useFormInstance';
import { Button, Input } from '@/ui'
import type { InstanceProps } from './FormInstanceScreens';
import type { Question } from '@/api';

export const SimpleTxtFrmInstance: React.FC<InstanceProps> = ({ formInstanceInfo, currentScreen, setCurrentScreen }) => {
    const currentState = useFormInstance.getState().formInstance!;
    const [error, setError] = useState<string>('');
    const savedAnswer = currentState.completed_questions?.find((question) => question.order === currentScreen.currentQuestionOrder)?.completer_user_answer ?? '';
    const [answerInput, setAnswerInput] = useState<string>(savedAnswer);

    useEffect(() => {
        setAnswerInput(savedAnswer);
    }, [savedAnswer]);

    const currentQuestionInfo: Question = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder) ?? {} as Question;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setAnswerInput(value);
    }
    const handleGoBackClick = () => {
        const nextQuestionType: number = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder - 1)?.question_type_id ?? 0;
        setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder - 1 });
    }
    return (
        <div id="simple-txt-container-form-div" className="bg-white p-7 border rounded-xl">
            <span>{`${currentQuestionInfo.title}: ${currentQuestionInfo.text}`}</span>
            <form id="simple-txt-container-form-form" className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
                <div className="flex flex-col pt-6 pb-20 gap-4">
                    <Input
                        type="text"
                        name="answer"
                        id="simple-txt-answer"
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
                        // color: primaryColor.startsWith("#e") || primaryColor.startsWith("#f") ? 'black' : 'white',
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
                            // color: primaryColor.startsWith("#e") || primaryColor.startsWith("#f") ? 'black' : 'white',
                            // borderColor: primaryColor.startsWith("#e") || primaryColor.startsWith("#fff") ? 'black' : 'white',
                        }}
                    >
                        Siguiente
                    </Button>
                </div>
            </form>
        </div>
    )
}
