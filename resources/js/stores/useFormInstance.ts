import { create } from "zustand";

//TODO - move this interface to the correct location
export interface CompletedForm {
    form_id:                  number;
    public_code:              string;
    final_date_time:          Date;
    completer_user_name:      string;
    completer_user_last_name: string;
    completer_user_email:     string;
    aux_code:                 string;
    completed_questions:      CompletedQuestion[];
}

export interface CompletedQuestion {
    id:                                     number;
    title:                                  string;
    completer_user_answer:                  string;
    text?:                                  string;
    order:                                  number;
    is_obligatory:                          boolean;
    question_type_id:                       number;
    question_type_name:                     string;
    form_id?:                               number;
    completer_user_answer_checked_options?: CompleterUserAnswerCheckedOption[];
}

export interface CompleterUserAnswerCheckedOption {
    id:               number;
    order:            number;
    title:            string;
    next_question:    number;
    form_question_id: number;
}


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
