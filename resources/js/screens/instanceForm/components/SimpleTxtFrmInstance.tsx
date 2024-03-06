import React from 'react'

import type { CompletedQuestion } from '@/api/formInstance';
import { useFormInstance } from '@/stores/useFormInstance';
import { Button } from '@/ui'
import type { InstanceProps } from './FormInstanceScreens';
import type { Question } from '@/api';

export const SimpleTxtFrmInstance: React.FC<InstanceProps> = ({ formInstanceInfo, currentScreen, setCurrentScreen }) => {
    const currentState = useFormInstance.getState().formInstance!;

    const currentQuestionInfo: Question = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder) ?? {} as Question;
    const handleNextQuestionButton = () => {
        const answer: CompletedQuestion = {
            id: currentQuestionInfo.id!,
            title: currentQuestionInfo.title,
            answer: currentQuestionInfo.text,
            order: currentQuestionInfo.order,
            is_mandatory: currentQuestionInfo.is_mandatory as boolean,
            question_type_id: currentQuestionInfo.question_type_id,
            question_type_name: currentQuestionInfo.question_type_name,
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
        const nextQuestionType: number = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder + 1)?.question_type_id ?? 6;
        setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder + 1 });
    }
    const handleGoBackClick = () => {
        const nextQuestionType: number = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder - 1)?.question_type_id ?? 0;
        setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder - 1 });
    }
    return (
        <div id="simple-txt-container-form-div" className="flex flex-col grow max-w-[400px] h-full max-h-[400px] bg-white p-6 border rounded-xl gap-3">
            <div className="flex flex-col justify-start items-start gap-4 h-full">
                <span>{`${currentQuestionInfo.title}`}</span>
                <span>{`${currentQuestionInfo.text}`}</span>
            </div>
            <div className="flex justify-between pt-3">
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
                    type="button"
                    id="submit-answer-btn"
                    style={{
                        backgroundColor: formInstanceInfo.primary_color,
                        border: formInstanceInfo.rounded_style ? 1 : 'none',
                        borderRadius: formInstanceInfo.rounded_style ?? 'none',
                        color: formInstanceInfo.primary_color ? formInstanceInfo.primary_color.startsWith("#e") || formInstanceInfo.primary_color.startsWith("#f") ? 'black' : 'white' : 'black',
                    }}
                    onClick={handleNextQuestionButton}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    )
}
