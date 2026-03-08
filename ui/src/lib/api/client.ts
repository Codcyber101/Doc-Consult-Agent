import axios from "axios";

// In production/docker, the backend is usually at :3001 or proxied.
// For development/browser access to backend, use :3001.
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001",
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
