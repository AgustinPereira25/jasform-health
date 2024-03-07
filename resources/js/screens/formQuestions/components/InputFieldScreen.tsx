import { useEffect, useState } from 'react';

import { Input } from '@/ui'
import type { Question } from '@/api';

interface InputTextScreenProps {
    currentQuestion: Question;
    formQuestions: Question[];
    setQuestions: (questions: Question[]) => void;
    setCurrentQuestion: (question: Question) => void;
};

export const InputFieldScreen: React.FC<InputTextScreenProps> = ({ currentQuestion, formQuestions, setQuestions, setCurrentQuestion }) => {
    // console.log(currentQuestion);
    // console.log(formQuestions)

    const [questionToShow, setQuestionToShow] = useState(currentQuestion.title ?? '');
    const [textToShow, setTextToShow] = useState(currentQuestion.text ?? '');

    useEffect(() => {
        setQuestionToShow(currentQuestion.title ?? '');
        setTextToShow(currentQuestion.text ?? '');
    }, [currentQuestion.title, currentQuestion.text]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        if (id === 'title') {
            setQuestionToShow(value);
        } else if (id === 'text') {
            setTextToShow(value);
        }
        // Update the formQuestions general state
        const updatedQuestions = formQuestions?.map((question) => {
            if (question.order === currentQuestion.order) {
                delete question.question_options;
                return {
                    ...question,
                    [id]: value,
                };
            }
            return question;
        });
        setQuestions(updatedQuestions ?? []);
        const currentModifiedQuestion = updatedQuestions?.find((question) => question.order === currentQuestion.order);
        setCurrentQuestion(currentModifiedQuestion!);
    }

    return (
        <div className="flex flex-col py-4">
            <div className="flex flex-col gap-3 md:flex-row">
                <span className="shrink-0 w-28">Question to Show</span>
                <Input
                    containerClassName="w-full"
                    // fullHeight
                    type="text"
                    id="title"
                    placeholder="Question to Show"
                    value={questionToShow}
                    onChange={(event) => handleChange(event)}
                />
            </div>
            <hr />
            <div className="flex flex-col gap-3 md:flex-row py-4">
                <span className="shrink-0 w-28">Text to Show</span>
                <Input
                    containerClassName="w-full"
                    fullHeight
                    type="text"
                    id="text"
                    placeholder="Text to Show"
                    // error={errors.firstName?.message}
                    value={textToShow}
                    onChange={(event) => handleChange(event)}
                />
            </div>
            <hr />
        </div>
    )
}