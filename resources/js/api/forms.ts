import type { QueryClient } from "@tanstack/react-query";

import type { ServiceResponse } from "./api.types";
import { privateAPI } from "./axios";

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
    description?: string;
    creation_date_time?: Date;
    logo?: Blob;
    primary_color?: string;
    secondary_color?: string;
    rounded_style?: string;
    api_url?: string;
    status?: string;
    public_code?: string;
    user_creator_id?: number;
}

export const getFormsQuery = () => ({
    queryKey: [DOMAIN, ALL, "getFormsQuery"],
    queryFn: async () => {
        const response = await privateAPI.get<ServiceResponse<Form[]>>("/forms");
        // console.log(response)
        return response.data.data;
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
