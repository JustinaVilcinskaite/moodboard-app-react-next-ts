type LoginValidationParams = {
  email: string;
  password: string;
};

export const validateLogin = ({ email, password }: LoginValidationParams) => {
  if (!email.trim() || !password) {
    return "All fields are required.";
  }

  return null;
};
