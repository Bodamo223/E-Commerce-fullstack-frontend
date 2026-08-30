import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export const API = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const refreshClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

let storeRef = null;
let refreshPromise = null;

export function bindAuthStore(store) {
  storeRef = store;
}

function isAuthRefreshUrl(url = "") {
  return ["/auth/refresh", "/login", "/register"].some((path) =>
    url.includes(path),
  );
}

API.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    const token = storeRef?.getState()?.Auth?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthRefreshUrl(originalRequest.url)
    ) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = refreshClient
            .post("/auth/refresh")
            .finally(() => {
              refreshPromise = null;
            });
        }

        const res = await refreshPromise;
        const newAccessToken = res.data.access_token;

        storeRef?.dispatch({
          type: "AuthSlice/setSession",
          payload: {
            token: newAccessToken,
            user: res.data.user,
          },
        });

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        storeRef?.dispatch({ type: "AuthSlice/clearAuth" });
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
