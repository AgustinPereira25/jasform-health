import type { QueryClient } from "@tanstack/react-query";

import { query_keys } from "@/constants/query_keys";

import type { ServiceResponse } from "./api.types";
import { getAuthHeaders, privateAPI, urlAPI } from "./axios";

export interface CompletedForm {
  form_id: number;
  initial_date_time: Date;
  final_date_time?: Date;
  completer_user_first_name: string;
  completer_user_last_name: string;
  completer_user_email: string;
  completer_user_code: string;
  public_code: string;
  completed_questions_count: number;
  completed_questions: CompletedQuestion[];
  api_url?: string;
  aux_code?: string;
}

export interface CompletedQuestion {
  id: number;
  title: string;
  answer: string;
  text?: string;
  order: number;
  is_mandatory: boolean;
  question_type_id: number;
  question_type_name: string;
  form_id?: number;
  completer_user_answer_checked_options?: CompleterUserAnswerCheckedOption[];
  is_completed?: boolean;
  mapping_key?: string;
}

export interface CompleterUserAnswerCheckedOption {
  id: number;
  order: number;
  title: string;
  next_question: number;
  form_question_id?: number;
}

const DOMAIN = "form_instance";
const ALL = "all";

export const createFormInstance = {
  mutation: async (body: CompletedForm) => {
    // console.log("body:", body);
    const response = await privateAPI.post<ServiceResponse<CompletedForm>>(
      "/form_instances",
      {
        ...body,
      },
    );
    // console.log("response:", { response });
    return response.data.data;
  },
  invalidates: (queryClient: QueryClient) => {
    void queryClient.invalidateQueries({ queryKey: [DOMAIN, ALL] });
  },
};

export interface FormInstanceURL {
  url: string;
  body: CompletedForm;
}
export const sendExternalEndpoint = {
  mutation: async (info: FormInstanceURL) => {
    // console.log("body:", info.body);
    // console.log("url:", info.url);
    const response = await urlAPI.post<ServiceResponse<CompletedForm>>(
      info.url,
      {
        ...info.body,
      },
    );
    // console.log("response:", { response });
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
  nameEmailCode?: string,
  submitted_start_date?: string,
  submitted_end_date?: string,
  sort?: string,
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
    sort,
  ],
  queryFn: async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    console.log("getFormInstancesQuery-sort:", sort);
    const response = await privateAPI.get<ServiceResponse<CompletedForm[]>>(
      `form_instances/byFormId/${formId}`,
      {
        params: {
          perPage: perPage,
          currentPage: currentPage,
          sort: sort ?? "final_date_time",
        },
        headers: getAuthHeaders(),
      },
    );
    // // console.log(response)
    return response.data;
  },
});
