import { emailRegex, passwordRegex } from "../utils/regex";

type SignupValidationParams = {
  name: string;
  email: string;
  password: string;
};

export const validateSignup = ({
  name,
  email,
  password,
}: SignupValidationParams) => {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  if (!trimmedName || !trimmedEmail || !password) {
    return "All fields are required.";
  }

  if (trimmedName.length < 2 || trimmedName.length > 50) {
    return "Name must be between 2 and 50 characters long.";
  }

  if (!emailRegex.test(trimmedEmail)) {
    return "Please enter a valid email.";
  }
  
  if (!passwordRegex.test(password)) {
    return "Password must be at least 8 characters long and contain at least one number.";
  }
  return null;
};
