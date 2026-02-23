import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000",
  timeout: 60_000,
});

apiClient.interceptors.request.use((config) => {
  // MVP auth: backend AuthGuard accepts this mock token.
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN || "mock-user-token";
  config.headers = config.headers ?? {};
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

