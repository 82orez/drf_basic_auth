import { api } from "@/lib/api";
import type { User, RegisterForm, LoginForm, PasswordResetForm, PasswordResetConfirmForm } from "@/types/auth";

export const authService = {
  async register(data: RegisterForm) {
    const response = await api.post("/api/auth/register/", data);
    return response.data;
  },

  async login(data: LoginForm) {
    const response = await api.post("/api/auth/login/", data);
    return response.data;
  },

  async logout() {
    const response = await api.post("/api/auth/logout/");
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get("/api/auth/profile/");
    return response.data;
  },

  async requestPasswordReset(data: PasswordResetForm) {
    const response = await api.post("/api/auth/password-reset/", data);
    return response.data;
  },

  async confirmPasswordReset(uid: string, token: string, data: PasswordResetConfirmForm) {
    const response = await api.post(`/api/auth/password-reset-confirm/${uid}/${token}/`, data);
    return response.data;
  },
};
