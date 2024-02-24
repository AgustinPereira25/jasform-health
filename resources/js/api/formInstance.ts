import type { QueryClient } from "@tanstack/react-query";

import type { ServiceResponse } from "./api.types";
import { getAuthHeaders, privateAPI } from "./axios";
import { query_keys } from "@/constants/query_keys";

export interface CompletedForm {
    form_id:                   number;
    initial_date_time:         Date;
    final_date_time?:          Date;
    completer_user_first_name: string;
    completer_user_last_name:  string;
    completer_user_email:      string;
    public_code:               string;
    completed_questions_count: number,
    completed_questions:       CompletedQuestion[];
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

  export const getFormInstancesQuery = (
    perPage: number,
    currentPage: number,
    formId: string,
    nameEmailCode: string,
    submitted_start_date: string,
    submitted_end_date: string,
  ) => ({
    queryKey: [
      DOMAIN,
      ALL,
      query_keys.FORM_INSTANCES_LIST,
      perPage,
      currentPage,
      nameEmailCode,
      submitted_start_date,
      submitted_end_date,
    ],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 700));

      const response = await privateAPI.get<ServiceResponse<CompletedForm[]>>(`form_instances/byFormId/${formId}`, {
        params: {
          perPage: perPage,
          currentPage: currentPage,
        },
        headers: getAuthHeaders(),
      });
      // console.log(response)
      return response.data;
    },
  });
