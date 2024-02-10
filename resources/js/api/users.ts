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
  position_in_organization?: string;
  is_active?: boolean;
  email?: string;
  organization_id?: string;
  organization_name?: string;
  roles?: UserRoles[];
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
      },
      headers: getAuthHeaders(),
    });
    return response.data;
  },
});

export const getUserQuery = (userId: User["id"]) => ({
  queryKey: [DOMAIN, userId, "getUserQuery"],
  queryFn: async () => {
    const response = await privateAPI.get<ServiceResponse<User>>(
      `/users/${userId}`,
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

export const createUser = {
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
