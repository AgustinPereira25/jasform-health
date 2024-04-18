import { query_keys } from "@/constants/query_keys";

import { Organizations } from "../screens/organizations/Organizations";
import type { ServiceResponse } from "./api.types";
import { getAuthHeaders, privateAPI } from "./axios";

const DOMAIN = "organization";
const ALL = "all";

export interface Organizations {
  status: number;
  success: boolean;
  data: Organization[];
}

export interface Organization {
  id?: number;
  name?: string;
  description?: string;
}

export const getOrganizationsQuery = (
  perPage: number,
  currentPage: number,
) => ({
  queryKey: [DOMAIN, ALL, query_keys.ORGANIZATIONS_LIST, perPage, currentPage],
  queryFn: async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    const response = await privateAPI.get<ServiceResponse<Organization[]>>(
      "organizations",
      {
        params: {
          perPage: perPage,
          currentPage: currentPage,
        },
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  },
});
