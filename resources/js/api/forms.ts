import type { QueryClient } from "@tanstack/react-query";

import { query_keys } from "@/constants/query_keys";

import type { ServiceResponse } from "./api.types";
import { getAuthHeaders, privateAPI } from "./axios";
import type { User } from "./users";

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
  creation_date?: Date;
  last_modified_date_time?: Date;
  logo?: string;
  primary_color?: string;
  secondary_color?: string;
  rounded_style?: string;
  api_url?: string;
  is_active?: string;
  public_code?: string;
  user_id?: number;
  form_instances_count?: number;
  form_questions_count?: number;
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

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const createForm = {
  mutation: async (params: CreateUserParams) => {
    const { passwordConfirmation, ...rest } = params;
    const response = await privateAPI.post<ServiceResponse<User>>("/users", {
      ...rest,
      password_confirmation: passwordConfirmation,
    });

    return response.data.data;
  },
  invalidates: (queryClient: QueryClient) => {
    void queryClient.invalidateQueries({ queryKey: [DOMAIN, ALL] });
  },
};

export const deleteForm = {
  mutation: async (userId: User["id"]) => {
    await privateAPI.delete(`/users/${userId}`);
  },
  invalidates: (
    queryClient: QueryClient,
    { userId }: { userId: User["id"] },
  ) => {
    void queryClient.invalidateQueries({ queryKey: [DOMAIN, ALL] });
    void queryClient.invalidateQueries({ queryKey: [DOMAIN, userId] });
  },
};
