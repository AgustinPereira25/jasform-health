import { useEffect, useState } from 'react';

import { Input } from '@/ui'
import type { Question } from '@/api';

interface InputTextScreenProps {
    currentQuestion: Question;
    formQuestions: Question[];
    setQuestions: (questions: Question[]) => void;
};

export const InputFieldScreen: React.FC<InputTextScreenProps> = ({ currentQuestion, formQuestions }) => {
    // console.log(currentQuestion);
    // console.log(formQuestions)
    const [questionToShow, setQuestionToShow] = useState(currentQuestion.title ?? '');
    const [textToShow, setTextToShow] = useState(currentQuestion.text ?? '');

    useEffect(() => {
        setQuestionToShow(currentQuestion.title ?? '');
        setTextToShow(currentQuestion.text ?? '');
    }, [currentQuestion.title, currentQuestion.text]);

    return (
        <div className="flex flex-col py-4">
            <div className="flex gap-3">
                <span className="shrink-0">Question to Show</span>
                <Input
                    containerClassName="w-full"
                    // fullHeight
                    type="text"
                    id="question_to_show"
                    placeholder="Question to Show"
                    value={questionToShow}
                    onChange={(event) => setQuestionToShow(event.target.value)}
                />
            </div>
            <hr />
            <div className="flex gap-3 py-4">
                <span className="shrink-0">Text to Show</span>
                <Input
                    containerClassName="w-full"
                    fullHeight
                    type="text"
                    id="text_to_show"
                    placeholder="Text to Show"
                    // error={errors.firstName?.message}
                    value={textToShow}
                    onChange={(event) => setTextToShow(event.target.value)}
                />
            </div>
            <hr />
        </div>
    )
}