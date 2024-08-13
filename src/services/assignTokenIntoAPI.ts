import { axiosInstance } from "./apiClient";

export const assignTokenIntoAPI = () => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = window.localStorage.getItem("access_token");
      config.headers["Authorization"] = `Bearer ${token}`;
      const tenant = window.sessionStorage.getItem("access_token");
      config.headers["Tenant"] = tenant;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};
