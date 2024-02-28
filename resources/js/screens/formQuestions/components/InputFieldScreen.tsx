import { useEffect, useState } from 'react';

import { Input } from '@/ui'
import type { Question } from '@/api';

interface InputTextScreenProps {
    currentQuestion: Question;
    formQuestions: Question[];
    setQuestions: (questions: Question[]) => void;
};

export const InputFieldScreen: React.FC<InputTextScreenProps> = ({ currentQuestion, formQuestions, setQuestions }) => {
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
            if (question.id === currentQuestion.id) {
                delete question.question_options;
                return {
                    ...question,
                    [id]: value,
                };
            }
            return question;
        });
        setQuestions(updatedQuestions ?? []);
    }

    return (
        <div className="flex flex-col py-4">
            <div className="flex gap-3">
                <span className="shrink-0">Question to Show</span>
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
            <div className="flex gap-3 py-4">
                <span className="shrink-0">Text to Show</span>
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