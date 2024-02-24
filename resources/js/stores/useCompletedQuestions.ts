import { create } from "zustand";

import type { CompletedQuestion } from "@/api/formInstance";

export interface CompletedQuestionsState {
  completedQuestions: CompletedQuestion[] | null;
  setCompletedQuestions: (completedQuestions: CompletedQuestion[] | null) => void;
  clearCompletedQuestions: () => void;
}

export const useCompletedQuestions = create<CompletedQuestionsState>((set) => ({
    completedQuestions: null,
    setCompletedQuestions: (completedQuestions: CompletedQuestion[] | null) => {
    set({ completedQuestions });
  },
  clearCompletedQuestions: () => {
    set({ completedQuestions: null });
  },
}));
