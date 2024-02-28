import axios from "axios";

// import { env } from "@/env";
import { errorResponse, privateRequest } from "./interceptors";

const baseConfig = {
  // baseURL: env.VITE_API_URL,
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const publicAPI = axios.create(baseConfig);
export const privateAPI = axios.create(baseConfig);

privateAPI.interceptors.request.use(privateRequest);
privateAPI.interceptors.response.use((response) => response, errorResponse);

export const getAuthHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

const getToken = () => {
  return "replaceTokenHere";
};

const getExternalToken = () => {
  if (typeof document !== "undefined") {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute("content") : "";
  }
  return "";
};

const csrfToken = getExternalToken();

const externalBaseConfig = {
  headers: {
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": csrfToken,
    "csrf-token": csrfToken,
  },
};
export const urlAPI = axios.create(externalBaseConfig);
