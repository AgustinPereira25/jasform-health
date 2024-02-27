import type { User } from "@/api/users";

import { publicAPI } from "../../api/axios";

export interface LoginResponse {
  message: string;
  accessToken: string;
  user: User;
}

export interface LoginParams {
  email: string;
  password: string;
}

export const loginMutation = {
  mutation: async (params: LoginParams) => {
    console.log("loginMutation-params:", params);
    const response = await publicAPI.post<LoginResponse>("/login", params);
    return response;
  },
};
