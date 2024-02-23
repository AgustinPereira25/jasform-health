import React from 'react'

import type { CompletedQuestion } from '@/api/formInstance'

interface CompletedQuestionsProps {
    completed_questions: CompletedQuestion[];
}
export const CompletedQuestions: React.FC<CompletedQuestionsProps> = ({ completed_questions }) => {
    console.log(completed_questions)
    return (
        <div>CompletedQuestions</div>
    )
}
