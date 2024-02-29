import axios from "axios";

// import { env } from "@/env";
import { errorResponse, privateRequest } from "./interceptors";

const publicBaseConfig = {
  // baseURL: env.VITE_API_URL,
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
export const publicAPI = axios.create(publicBaseConfig);

export const getAuthHeaders = () => ({ Authorization: `Bearer ${getToken()}` });
const getToken = () => {
  console.log("getToken()");
  const storeString = localStorage.getItem("userData");
  console.log("1getToken()-storeString", storeString);
  if (storeString) {
    console.log("2getToken()-storeString", storeString);
    const store = JSON.parse(storeString);
    console.log("getToken()-store", store);
    const token = store.state ? store.state.token : null;
    console.log("getToken()-token", token);
    return token;
  }
  return null;
};

const privateBaseConfig = {
  // baseURL: env.VITE_API_URL,
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  Authorization: `Bearer ${getToken()}`,
};
export const privateAPI = axios.create(privateBaseConfig);
privateAPI.interceptors.request.use(privateRequest);
privateAPI.interceptors.response.use((response) => response, errorResponse);

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
