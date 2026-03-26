type LoginValidationParams = {
  email: string;
  password: string;
};

export const validateLogin = ({ email, password }: LoginValidationParams) => {
  if (!email || !password) {
    return "All fields are required.";
  }

  return null;
};
