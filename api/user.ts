import { api } from "./axios";
import { getAuthHeaders } from "../utils/auth";

type SignupProps = {
  name: string;
  email: string;
  password: string;
};

type LoginProps = {
  email: string;
  password: string;
};

export const signup = async ({ name, email, password }: SignupProps) => {
  const body = {
    name,
    email,
    password,
  };

  const response = await api.post("/users/register", body);
  return response.data;
};

export const login = async ({ email, password }: LoginProps) => {
  const body = {
    email,
    password,
  };

  const response = await api.post("/users/login", body);
  return response.data;
};

export const getMe = async () => {
  const headers = getAuthHeaders();
  const response = await api.get("/users/me", { headers });

  return response.data;
};
