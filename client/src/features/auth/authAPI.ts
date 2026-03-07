import api from "../../services/axios";
import type { LoginForm, AuthResponse } from "../../types/auth";

export const loginAPI = async (data: LoginForm): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", data);

  return res.data;
};
