import React, { useEffect, useState } from 'react'

import type { CompletedQuestion } from '@/api/formInstance';
import { useFormInstance } from '@/stores/useFormInstance';
import { Button, Input } from '@/ui'
import type { InstanceProps } from '.';
import type { Question } from '@/api';
import { adjustHoverColor, getColorContrast } from '@/helpers/helpers';

export const InputFieldFrmInstance: React.FC<InstanceProps> = ({ formInstanceInfo, currentScreen, setCurrentScreen }) => {
    ;
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
                text: currentQuestionInfo.text,
                answer: answerInput,
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
    const [hoveredPrimary, setHoveredPrimary] = useState(false);
    const [hoveredSecondary, setHoveredSecondary] = useState(false);

    const hoverColorPrimary = adjustHoverColor(formInstanceInfo.primary_color);
    const hoverColorSecondary = adjustHoverColor(formInstanceInfo.secondary_color);

    return (
        <div id="input-field-container-form-div" className="flex flex-col grow max-w-[400px] h-full max-h-[400px] bg-white p-6 border rounded-xl gap-3">
            <div className="flex flex-col justify-center gap-2">
                <h1 className="font-semibold">{`${currentQuestionInfo.title}`}</h1>
                <p>{`${currentQuestionInfo.text}`}</p>
            </div>
            <form id="input-field-container-form-form" className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
                <div className="flex flex-col pt-6 pb-20 gap-4">
                    <Input
                        type="text"
                        name="answer"
                        id="input-field-answer"
                        placeholder="Your answer"
                        error={error && error}
                        value={answerInput}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-between p-1">
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
        </div>
    )
}
