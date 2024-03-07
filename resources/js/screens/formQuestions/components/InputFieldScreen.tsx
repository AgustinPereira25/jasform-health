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
    const [mappingKey, setMappingKey] = useState(currentQuestion.mapping_key ?? '');

    // useEffect(() => {
    //     setQuestionToShow(currentQuestion.title ?? '');
    //     setTextToShow(currentQuestion.text ?? '');
    // }, [currentQuestion.title, currentQuestion.text]);

    useEffect(() => {
        setQuestionToShow(currentQuestion.title ?? '');
        setTextToShow(currentQuestion.text ?? '');
        setMappingKey(currentQuestion.mapping_key ?? '');
    }, [currentQuestion.title, currentQuestion.text, currentQuestion.mapping_key]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        // if (id === 'title') {
        //     setQuestionToShow(value);
        // } else if (id === 'text') {
        //     setTextToShow(value);
        // }
        switch (id) {
            case 'title':
                setQuestionToShow(value);
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
                <span className="shrink-0 w-28">Title to show</span>
                <Input
                    containerClassName="w-full"
                    // fullHeight
                    type="text"
                    id="title"
                    placeholder="Title to show"
                    value={questionToShow}
                    onChange={(event) => handleChange(event)}
                />
            </div>
            <hr />
            <div className="flex flex-col gap-3 md:flex-row py-4">
                <span className="shrink-0 w-28">Text to show</span>
                <Input
                    containerClassName="w-full"
                    fullHeight
                    type="text"
                    id="text"
                    placeholder="Text to show"
                    // error={errors.firstName?.message}
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
