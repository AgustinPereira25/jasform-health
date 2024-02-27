// import type { QueryClient } from "@tanstack/react-query";

import type { ServiceResponse } from "./api.types";
import { privateAPI } from "./axios";
import type { Question } from "./forms";

// import type { User } from "./users";

const DOMAIN = "form";
// const ALL = "all";

export interface IFormQuestions {
  status: number;
  success: boolean;
  data: IFormQuestion[];
}

export interface IFormQuestion {
  id?: number;
  title?: string;
  text?: string;
  order?: number;
  is_mandatory?: boolean;
  form_id?: number;
  question_type_id?: number;
  question_type_name?: string;
}

export const getFormQuestionsQuery = (formId: Question["form_id"]) => ({
  queryKey: [DOMAIN, formId, "getFormQuestionsQuery"],
  queryFn: async () => {
    const response = await privateAPI.get<ServiceResponse<Question[]>>(
      `/form_questions/byFormId/${formId}`,
    );
    return response.data.data;
  },
});

// interface CreateUserParams {
//     name: string;
//     email: string;
//     password: string;
//     passwordConfirmation: string;
// }

// export const createForm = {
//     mutation: async (params: CreateUserParams) => {
//         const { passwordConfirmation, ...rest } = params;
//         const response = await privateAPI.post<ServiceResponse<User>>("/users", {
//             ...rest,
//             password_confirmation: passwordConfirmation,
//         });

//         return response.data.data;
//     },
//     invalidates: (queryClient: QueryClient) => {
//         void queryClient.invalidateQueries({ queryKey: [DOMAIN, ALL] });
//     },
// };

// export const deleteForm = {
//     mutation: async (userId: User["id"]) => {
//         await privateAPI.delete(`/users/${userId}`);
//     },
//     invalidates: (
//         queryClient: QueryClient,
//         { userId }: { userId: User["id"] },
//     ) => {
//         void queryClient.invalidateQueries({ queryKey: [DOMAIN, ALL] });
//         void queryClient.invalidateQueries({ queryKey: [DOMAIN, userId] });
//     },
// };
