import React, { useState } from 'react'

import type { CompletedQuestion } from '@/api/formInstance';
import { useFormInstance } from '@/stores/useFormInstance';
import { Button } from '@/ui'
import type { InstanceProps } from './FormInstanceScreens';
import type { Question } from '@/api';
import { adjustHoverColor, getColorContrast } from '@/helpers/helpers';

export const SimpleTxtFrmInstance: React.FC<InstanceProps> = ({ formInstanceInfo, currentScreen, setCurrentScreen }) => {
    const currentState = useFormInstance.getState().formInstance!;

    const currentQuestionInfo: Question = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder) ?? {} as Question;
    const handleNextQuestionButton = () => {
        const answer: CompletedQuestion = {
            id: currentQuestionInfo.id!,
            title: currentQuestionInfo.title,
            text: currentQuestionInfo.text,
            answer: 'Not apply',
            order: currentQuestionInfo.order,
            is_mandatory: currentQuestionInfo.is_mandatory as boolean,
            question_type_id: currentQuestionInfo.question_type_id,
            question_type_name: currentQuestionInfo.question_type_name,
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
        const nextQuestionType: number = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder + 1)?.question_type_id ?? 6;
        setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder + 1 });
    }
    const handleGoBackClick = () => {
        const nextQuestionType: number = formInstanceInfo.form_questions?.find((question) => question.order === currentScreen.currentQuestionOrder - 1)?.question_type_id ?? 0;
        setCurrentScreen({ questionType: nextQuestionType, currentQuestionOrder: currentScreen.currentQuestionOrder - 1 });
    }

    const [hoveredPrimary, setHoveredPrimary] = useState(false);
    const [hoveredSecondary, setHoveredSecondary] = useState(false);

    const hoverColorPrimary = adjustHoverColor(formInstanceInfo?.primary_color);
    const hoverColorSecondary = adjustHoverColor(formInstanceInfo?.secondary_color);

    console.log('color', hoverColorSecondary)
    return (
        <div id="simple-txt-container-form-div" className="flex flex-col grow max-w-[400px] h-full max-h-[400px] bg-white p-6 border rounded-xl gap-3">
            <div className="flex flex-col justify-start items-start gap-4 h-full">
                <h1 className="font-semibold">{`${currentQuestionInfo.title}`}</h1>
                <p>{`${currentQuestionInfo.text}`}</p>
            </div>
            <div className="flex justify-between p-1 pt-3">
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
                    }}
                    onMouseEnter={() => setHoveredSecondary(true)}
                    onMouseLeave={() => setHoveredSecondary(false)}
                >
                    Back
                </Button>
                <Button
                    aria-label="Next"
                    type="button"
                    id="submit-answer-btn"
                    style={{
                        backgroundColor: hoveredPrimary ? hoverColorPrimary : formInstanceInfo.primary_color,
                        border: formInstanceInfo.rounded_style ? 1 : 'none',
                        borderRadius: formInstanceInfo.rounded_style ?? 'none',
                        color: getColorContrast(formInstanceInfo.primary_color),
                    }}
                    onClick={handleNextQuestionButton}
                    onMouseEnter={() => setHoveredPrimary(true)}
                    onMouseLeave={() => setHoveredPrimary(false)}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
