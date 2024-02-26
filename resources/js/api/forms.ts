import type { QueryClient } from "@tanstack/react-query";

import { query_keys } from "@/constants/query_keys";
import type { ServiceResponse } from "./api.types";
import { getAuthHeaders, privateAPI } from "./axios";

const DOMAIN = "form";
const ALL = "all";

export interface Forms {
  status: number;
  success: boolean;
  data: Form[];
}

export interface Form {
  id?: number;
  name?: string;
  welcome_text?: string;
  final_text?: string;
  description?: string;
  creation_date_time?: string;
  last_modified_date_time?: Date;
  logo?: string;
  primary_color?: string;
  secondary_color?: string;
  rounded_style?: string;
  api_url?: string;
  is_active?: boolean;
  is_user_responses_linked?: boolean;
  is_initial_data_required?: boolean;
  public_code?: string;
  user_id?: number;
  form_instances_count?: number;
  form_questions_count?: number;
  form_questions?: Question[];
}

export interface Question {
  id: number;
  title: string;
  text: string;
  order: number;
  is_obligatory: boolean;
  form_id: number;
  question_type_id: number;
  question_type_name: string;
  question_options?: QuestionsOption[];
}

export interface QuestionsOption {
  id: number;
  order: number;
  title: string;
  next_question: number;
  form_question_id: number;
}

export const getFormsQuery = (
  perPage: number,
  currentPage: number,
  isActive: boolean,
  formTitle: string,
  date: string,
) => ({
  queryKey: [
    DOMAIN,
    ALL,
    query_keys.FORMS_LIST,
    perPage,
    currentPage,
    isActive,
    formTitle,
    date,
  ],
  queryFn: async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const response = await privateAPI.get<ServiceResponse<Form[]>>("forms", {
      params: {
        per_page: perPage,
        page: currentPage,
        isActive,
        form_title: formTitle,
        date,
      },
      headers: getAuthHeaders(),
    });
    // console.log(response)
    return response.data;
  },
});

export const getFormQuery = (formId: Form["id"]) => ({
  queryKey: [DOMAIN, formId, "getFormQuery"],
  queryFn: async () => {
    const response = await privateAPI.get<ServiceResponse<Form>>(
      `/forms/${formId}`,
    );

    return response.data.data;
  },
});

export const getFormByPublicCodeQuery = (public_code: Form["public_code"]) => ({
  queryKey: [DOMAIN, public_code, "getFormByPublicCodeQuery"],
  queryFn: async () => {
    const response = await privateAPI.get<ServiceResponse<Form>>(
      `/forms/byPublicCode/${public_code}`,
    );
    return response.data.data;
  },
});

export type CreateFormParams = Form

export const createForm = {
  mutation: async (params: CreateFormParams) => {
    const { ...rest } = params;
    const response = await privateAPI.post<ServiceResponse<Form>>("/forms", {
      ...rest
    });

    return response.data.data;
  },
  invalidates: (queryClient: QueryClient) => {
    void queryClient.invalidateQueries({ queryKey: [DOMAIN, ALL] });
  },
};

export const updateForm = {
  mutation: async (params: CreateFormParams) => {
    const { ...rest } = params;
    const response = await privateAPI.put<ServiceResponse<Form>>("/forms", {
      ...rest
    });

    return response.data.data;
  },
  invalidates: (queryClient: QueryClient) => {
    void queryClient.invalidateQueries({ queryKey: [DOMAIN, ALL] });
  },
};

export const deleteForm = {
  mutation: async (formId: Form["id"]) => {
    await privateAPI.delete(`/forms/${formId}`);
  },
  invalidates: (
    queryClient: QueryClient,
    { formId }: { formId: Form["id"] },
  ) => {
    void queryClient.invalidateQueries({ queryKey: [DOMAIN, ALL] });
    void queryClient.invalidateQueries({ queryKey: [DOMAIN, formId] });
  },
};
