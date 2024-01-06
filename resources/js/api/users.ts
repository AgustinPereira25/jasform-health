import type { QueryClient } from "@tanstack/react-query";

import type { ServiceResponse } from "./api.types";
import { privateAPI } from "./axios";

const DOMAIN = "user";
const ALL = "all";

// export interface User {
//   id: number;
//   name: string;
//   email: string;
// }

export interface Users {
  status:  number;
  success: boolean;
  data:    Datum[];
}

export interface Datum {
  id:                       number;
  first_name:               string;
  last_name:                string;
  photo:                    string;
  phone:                    string;
  position_in_organization: string;
  status:                   string;
  email:                    string;
  organization_id:          string;
}

export const getUsersQuery = () => ({
  queryKey: [DOMAIN, ALL, "getUsersQuery"],
  queryFn: async () => {
    const response = await privateAPI.get<ServiceResponse<Datum[]>>("/users");
    // console.log(response)
    return response.data.data;
  },
});

export const getUserQuery = (userId: Datum["id"]) => ({
  queryKey: [DOMAIN, userId, "getUserQuery"],
  queryFn: async () => {
    const response = await privateAPI.get<ServiceResponse<Datum>>(
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
