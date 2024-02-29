import type { QueryClient } from "@tanstack/react-query";

import type { ServiceResponse } from "./api.types";
import { privateAPI } from "./axios";
import type { Question } from "./forms";

const DOMAIN = "form_questions";
const ALL = "all";

export const getFormQuestionsQuery = (formId: Question["id"]) => ({
  queryKey: [DOMAIN, formId, "getFormQuestionsQuery"],
  queryFn: async () => {
    const response = await privateAPI.get<ServiceResponse<Question[]>>(
      `/form_questions/byFormId/${formId}`,
    );
    return response.data.data;
  },
});

export interface FormQuestionsPost {
  form_id: number;
  form_questions: Question[];
}
export const updateFormQuestions = {
  mutation: async (params: FormQuestionsPost) => {
    const { ...rest } = params;
    const response = await privateAPI.post<ServiceResponse<FormQuestionsPost>>("/form_questions/store_multiple_questions_with_options/", {
      ...rest,
    });

    return response.data.data;
  },
  invalidates: (queryClient: QueryClient) => {
    void queryClient.invalidateQueries({ queryKey: [DOMAIN, ALL] });
  },
};