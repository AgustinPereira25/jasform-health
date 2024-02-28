import type { User } from "@/api/users";

import { privateAPI, publicAPI } from "../../api/axios";

export interface LoginResponse {
  message: string;
  accessToken: string;
  user: User;
}

export interface LoginParams {
  email: string;
  password?: string;
}

export const loginMutation = {
  mutation: async (params: LoginParams) => {
    console.log("loginMutation-params:", params);
    const response = await publicAPI.post<LoginResponse>("/login", params);
    return response;
  },
};

export const logOutMutation = {
  mutation: async () => {
    console.log("loginMutation");
    const response = await privateAPI.post<LoginResponse>("/logout");
    console.log("loginMutation-response:", response);
    return response;
  },
};

export const recoverMutation = {
  mutation: async (params: LoginParams) => {
    console.log("recoverMutation-params:", params);
    const response = await publicAPI.post<LoginResponse>("/recover", params);
    return response;
  },
};

export const registerMutation = {
  mutation: async (params: LoginParams) => {
    console.log("registerMutation-params:", params);
    const response = await publicAPI.post<LoginResponse>("/register", params);
    return response;
  },
};
