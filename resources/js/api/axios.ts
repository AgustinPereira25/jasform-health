import axios from "axios";

// import { env } from "@/env";
import { errorResponse, privateRequest } from "./interceptors";

const baseConfig = {
  // baseURL: env.VITE_API_URL,
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export const publicAPI = axios.create(baseConfig);
export const privateAPI = axios.create(baseConfig);
export const urlAPI = axios.create();

privateAPI.interceptors.request.use(privateRequest);
privateAPI.interceptors.response.use((response) => response, errorResponse);

export const getAuthHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

const getToken = () => {
  return "replaceTokenHere";
};
