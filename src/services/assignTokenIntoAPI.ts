import { axiosInstance } from "./apiClient";

export const assignTokenIntoAPI = () => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = window.localStorage.getItem("access_token");
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};
