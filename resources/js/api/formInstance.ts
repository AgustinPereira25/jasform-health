import type { QueryClient } from "@tanstack/react-query";

import type { ServiceResponse } from "./api.types";
import { privateAPI } from "./axios";

export interface CompletedForm {
    form_id:                  number;
    initial_date_time:         Date;
    final_date_time?:          Date;
    completer_user_name:      string;
    completer_user_last_name: string;
    completer_user_email:     string;
    public_code:              string;
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

const DOMAIN = "form_instance";
const ALL = "all";

export const createFormInstance = {
    mutation: async (body: CompletedForm) => {
      const response = await privateAPI.post<ServiceResponse<CompletedForm>>("/form_instances", {
        body,
      });
      console.log(body)
      console.log({response});
      return response.data.data;
    },
    invalidates: (queryClient: QueryClient) => {
      void queryClient.invalidateQueries({ queryKey: [DOMAIN, ALL] });
    },
  };