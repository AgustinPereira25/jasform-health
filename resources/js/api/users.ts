import type { QueryClient } from "@tanstack/react-query";

import { query_keys } from "../constants/query_keys";
import type { ServiceResponse } from "./api.types";
import { getAuthHeaders, privateAPI } from "./axios";

const DOMAIN = "user";
const ALL = "all";

export interface Users {
  status: number;
  success: boolean;
  data: User[];
}

export interface UserRoles {
  id: number;
  name: string;
  description: string;
}

export interface User {
  id?: number;
  first_name?: string;
  last_name?: string;
  photo?: string;
  position_in_org?: string;
  is_active?: boolean;
  email?: string;
  organization_id?: string;
  organization_name?: string;
  role_name?: string;
  total_forms?: number;
  active_forms?: number;
  inactive_forms?: number;
}

export const getUsersQuery = (
  perPage: number,
  currentPage: number,
  isActive: boolean,
  isAdmin: boolean,
  nameOrEmail: string,
  positionOrOrganization: string,
  sort: string,
) => ({
  queryKey: [
    DOMAIN,
    ALL,
    query_keys.USERS_LIST,
    perPage,
    currentPage,
    isActive,
    isAdmin,
    nameOrEmail,
    positionOrOrganization,
    sort,
  ],
  queryFn: async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const response = await privateAPI.get<ServiceResponse<User[]>>("users", {
      params: {
        perPage,
        currentPage,
        isActive,
        isAdmin,
        nameOrEmail,
        positionOrOrganization,
        sort,
      },
      headers: getAuthHeaders(),
    });
    return response.data;
  },
});

export const getUserQuery = (userId: User["id"]) => ({
  queryKey: [DOMAIN, userId, "getUserQuery"],
  //   queryKey: [DOMAIN, userId, "getUserQuery"],
  queryFn: async () => {
    const response = await privateAPI.get<ServiceResponse<User>>(
      `/users/${userId}`,
    );
    return response.data.data;
  },
});

export interface DashboardData {
  total_forms: number;
  total_form_instances: number;
  total_form_questions: number;
  total_completer_users: number;
}

export interface DashboardResponse {
  status: number;
  success: boolean;
  data: DashboardData;
}

export const getUserDashboard = (userId: User["id"]) => ({
  queryKey: [DOMAIN, userId, "getUserDashboard"],
  queryFn: async () => {
    const response = await privateAPI.get<DashboardResponse>(
      `/users/getDashboard/${userId}`,
    );
    return response.data.data;
  },
});

export interface CreateUserParams extends User {
  password: string;
  passwordConfirmation: string;
}

export const createUser = {
  mutation: async (params: CreateUserParams) => {
    const { passwordConfirmation, is_active, ...rest } = params;
    const response = await privateAPI.post<ServiceResponse<User>>("/users", {
      ...rest,
      is_active: is_active ? "1" : "0",
      password_confirmation: passwordConfirmation,
    });
    return response;
  },
  invalidates: (queryClient: QueryClient) => {
    void queryClient.invalidateQueries({ queryKey: [DOMAIN, ALL] });
  },
};

export const updateUser = {
  mutation: async (params: CreateUserParams) => {
    const { passwordConfirmation, is_active, ...rest } = params;
    const response = await privateAPI.put<ServiceResponse<User>>("/users", {
      ...rest,
      is_active: is_active ? "1" : "0",
      password_confirmation: passwordConfirmation,
    });
    return response;
  },
  invalidates: (queryClient: QueryClient) => {
    void queryClient.invalidateQueries({ queryKey: [DOMAIN, ALL] });
  },
};

export const deleteUser = {
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

export interface IHttpResponseError extends Error {
  response?: {
    data?: {
      message?: string;
      error?: {
        fields?: Record<string, any[]>;
      };
    };
  };
}
