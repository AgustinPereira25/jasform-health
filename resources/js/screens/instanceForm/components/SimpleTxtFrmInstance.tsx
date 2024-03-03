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
        useFormInstance.setState({ formInstance: { ...currentState, completed_questions: [...currentState.completed_questions, answer] } });
        const nextQuestionType: number = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder + 1)?.question_type_id ?? 6;
        setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder + 1 });
    }
    const handleGoBackClick = () => {
        const nextQuestionType: number = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder - 1)?.question_type_id ?? 0;
        setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder - 1 });
    }
    return (
        <div id="simple-txt-container-form-div" className="bg-white p-7 border rounded-xl max-w-md w-[30%]">
            <div className="flex flex-col justify-center gap-5">
                <span>{`${currentQuestionInfo.title}`}</span>
                <span>{`${currentQuestionInfo.text}`}</span>
            </div>
            <div className="flex justify-between pt-8">
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
