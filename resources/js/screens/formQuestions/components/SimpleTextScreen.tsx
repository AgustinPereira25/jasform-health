import React, { useEffect, useState } from 'react'

import { Input } from '@/ui'
import type { Question } from '@/api';

interface SimpleTextScreenProps {
    currentQuestion: Question;
    formQuestions?: Question[];
    setQuestions: (questions: Question[]) => void;
    setCurrentQuestion: (question: Question) => void;
};
// TODO - Make input text full height (it overflows the container).
export const SimpleTextScreen: React.FC<SimpleTextScreenProps> = ({ currentQuestion, formQuestions, setQuestions, setCurrentQuestion }) => {
    // console.log(currentQuestion);
    // console.log(formQuestions);
    const [title, setTitle] = React.useState(currentQuestion.title ?? '');
    const [textToShow, setTextToShow] = React.useState(currentQuestion.text ?? '');
    const [mappingKey, setMappingKey] = useState(currentQuestion.mapping_key ?? '');

    useEffect(() => {
        setTitle(currentQuestion.title ?? '');
        setTextToShow(currentQuestion.text ?? '');
    }, [currentQuestion.title, currentQuestion.text]);

    useEffect(() => {
        setTitle(currentQuestion.title ?? '');
        setTextToShow(currentQuestion.text ?? '');
        setMappingKey(currentQuestion.mapping_key ?? '');
    }, [currentQuestion.title, currentQuestion.text, currentQuestion.mapping_key]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        switch (id) {
            case 'title':
                setTitle(value);
                break;
            case 'text':
                setTextToShow(value);
                break;
            case 'mapping_key':
                setMappingKey(value);
                break;
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
                <span className="shrink-0 w-28">Title</span>
                <Input
                    containerClassName="w-full"
                    // fullHeight
                    type="text"
                    id="title"
                    placeholder="Title"
                    // value={passwordInput}
                    value={title}
                    onChange={(event) => handleChange(event)}
                />
            </div>
            <hr />
            <div className="flex flex-col gap-3 py-4 md:flex-row">
                <span className="shrink-0 w-28">Text to Show</span>
                <Input
                    containerClassName="w-full"
                    fullHeight
                    type="text"
                    id="text"
                    placeholder="Text to Show"
                    value={textToShow}
                    onChange={(event) => handleChange(event)}
                />
            </div>
            <hr />
            <div className="flex flex-col gap-3 md:flex-row py-4">
                <span className="shrink-0 w-28">Mapping key</span>
                <Input
                    containerClassName="w-full"
                    type="text"
                    id="mapping_key"
                    placeholder="Mapping key"
                    // error={errors.firstName?.message}
                    value={mappingKey}
                    onChange={(event) => handleChange(event)}
                />
            </div>
            <hr />
        </div>
    )
}
