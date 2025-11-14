import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// CSRF 토큰을 가져오는 함수
export const getCsrfToken = async () => {
  try {
    const response = await api.get("/api/auth/csrf/");
    return response.data.csrfToken;
  } catch (error) {
    console.error("Error getting CSRF token:", error);
    return null;
  }
};

// Request interceptor to add CSRF token
api.interceptors.request.use(
  async (config) => {
    if (config.method === "post" || config.method === "put" || config.method === "delete") {
      const csrfToken = await getCsrfToken();
      if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
