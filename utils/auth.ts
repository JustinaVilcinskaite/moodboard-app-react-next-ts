import Cookies from "js-cookie";

const TOKEN_KEY = "moodboard_token";

export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token);
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const getAuthHeaders = () => {
  const token = getToken();

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};
