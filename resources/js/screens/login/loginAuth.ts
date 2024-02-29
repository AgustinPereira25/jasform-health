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

export const registerMutation = {
  mutation: async (params: LoginParams) => {
    const response = await publicAPI.post<LoginResponse>("/register", params);
    return response;
  },
};
