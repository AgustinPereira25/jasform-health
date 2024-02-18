import type { CompletedQuestion } from '@/stores/useFormInstance';
import { useFormInstance } from '@/stores/useFormInstance';
import { Button, Input } from '@/ui'
import React, { useState } from 'react'
import type { InstanceProps } from '.';
import type { Question } from '@/api';

export const InputFieldFrmInstance: React.FC<InstanceProps> = ({ formInstanceInfo, currentScreen, setCurrentScreen }) => {
    const currentState = useFormInstance.getState().formInstance!;

    const [error, setError] = useState<string>('');
    const [answerInput, setAnswerInput] = useState<string>('');

    const currentQuestionInfo: Question = formInstanceInfo.questions?.find((question) => question.order === currentScreen.currentQuestionOrder) ?? {} as Question;
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
            const nextQuestionType: number = formInstanceInfo.questions?.find((question) => question.order === currentScreen.currentQuestionOrder + 1)?.question_type_id ?? 6;
            setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder + 1 });
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setAnswerInput(value);
    }
    const handleGoBackClick = () => {
        const nextQuestionType: number = formInstanceInfo.questions?.find((question) => question.order === currentScreen.currentQuestionOrder - 1)?.question_type_id ?? 0;
        setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder - 1 });
    }
    return (
        <div id='input-field-container-form-div' className='bg-gray-300 p-7 border rounded-xl'>
            <span>{`${currentQuestionInfo.title}: ${currentQuestionInfo.text}`}</span>
            <form id='input-field-container-form-form' className='flex flex-col justify-between h-full' onSubmit={handleSubmit}>
                <div className='flex flex-col pt-6 pb-20 gap-4'>
                    <Input
                        type="text"
                        name="answer"
                        id="input-field-answer"
                        placeholder='Tu Respuesta'
                        error={error && error}
                        value={answerInput}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex justify-between'>
                    <Button variant='secondary' type="button" id="goBack-answer-btn" onClick={handleGoBackClick}>Atrás</Button>
                    <Button type="submit" id="submit-answer-btn">Siguiente</Button>
                </div>
            </form>
        </div>
    )
}
