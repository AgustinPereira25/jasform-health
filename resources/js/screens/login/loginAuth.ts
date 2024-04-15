import type { User } from "@/api/users";

import { privateAPI, publicAPI } from "../../api/axios";

interface LoginData {
  message: string;
  user: User;
  accessToken: string;
}

export interface ServiceResponse<T> {
  status: number;
  success: boolean;
  data: T;
}

export type LoginResponse = ServiceResponse<LoginData>;

export interface LoginParams {
  email: string;
  password?: string;
  two_factor_code?: string;
}

export const loginMutation = {
  mutation: async (params: LoginParams) => {
    const response = await publicAPI.post<LoginResponse>("/login", params);
    return response;
  },
};

export const logOutUserMutation = {
  mutation: async () => {
    const response = await privateAPI.post<LoginResponse>("/logout");
    return response;
  },
};

export const recoverMutation = {
  mutation: async (params: LoginParams) => {
    const response = await publicAPI.post<LoginResponse>("/recover", params);
    return response;
  },
};

export interface RecoverChangePasswordParams {
  token: string;
  email: string;
  newPassword: string;
  newPassword_confirmation: string;
}

export const recoverChangePasswordMutation = {
  mutation: async (params: RecoverChangePasswordParams) => {
    const response = await publicAPI.post<LoginResponse>(
      "/recover-change-password",
      params,
    );
    return response;
  },
};

export const registerPreEmailValidationMutation = {
  mutation: async (email: string) => {
    const response = await publicAPI.post<LoginResponse>(
      "/register-pre-email-validation",
      {
        email: email,
      },
    );
    return response;
  },
};

export interface RegisterParams {
  first_name: string;
  last_name: string;
  organization_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role_name: "Creator";
  is_active: 1;
  emailValidationCode: string;
}

export const registerMutation = {
  mutation: async (params: RegisterParams) => {
    const response = await publicAPI.post<LoginResponse>("/register", params);
    return response;
  },
};
