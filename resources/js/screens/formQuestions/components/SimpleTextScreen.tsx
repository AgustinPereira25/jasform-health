import React, { useEffect } from 'react'

import { Input } from '@/ui'
import type { Question } from '@/api';

interface SimpleTextScreenProps {
    currentQuestion: Question;
    formQuestions?: Question[];
    setQuestions: (questions: Question[]) => void;
};
// TODO - Make input text full height (it overflows the container).
export const SimpleTextScreen: React.FC<SimpleTextScreenProps> = ({ currentQuestion, formQuestions }) => {
    // console.log(currentQuestion);
    // console.log(formQuestions);
    const [title, setTitle] = React.useState(currentQuestion.title ?? '');
    const [textToShow, setTextToShow] = React.useState(currentQuestion.text ?? '');

    useEffect(() => {
        setTitle(currentQuestion.title ?? '');
        setTextToShow(currentQuestion.text ?? '');
    }, [currentQuestion.title, currentQuestion.text]);


    return (
        <div className="flex flex-col py-4">
            <div className="flex gap-3">
                <span className="shrink-0">Title</span>
                <Input
                    containerClassName="w-full"
                    // fullHeight
                    type="text"
                    id="title"
                    placeholder="Title"
                    // value={passwordInput}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
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
                    value={textToShow}
                    onChange={(event) => setTextToShow(event.target.value)}
                />
            </div>
            <hr />
        </div>
    )
}
