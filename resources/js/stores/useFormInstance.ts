import { create } from "zustand";

import type { CompletedForm } from "@/api/formInstance";

export interface FormInstanceState {
  formInstance: CompletedForm | null;
  setFormInstance: (formInstance: CompletedForm | null) => void;
  clearFormInstance: () => void;
}

export const useFormInstance = create<FormInstanceState>((set) => ({
  formInstance: null,
  setFormInstance: (formInstance: CompletedForm | null) => {
    set({ formInstance });
  },
  clearFormInstance: () => {
    set({ formInstance: null });
  },
}));
