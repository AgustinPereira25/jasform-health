import React from 'react'

import { useCompletedQuestions } from '@/stores';

// import type { CompletedQuestion } from '@/api/formInstance'

// interface CompletedQuestionsProps {
//     completed_questions: CompletedQuestion[];
// }
export const CompletedQuestions: React.FC = () => {
    const completed_questions = useCompletedQuestions.getState().completedQuestions!;
    console.log(completed_questions);
    return (
        <div>CompletedQuestions</div>
    )
}
