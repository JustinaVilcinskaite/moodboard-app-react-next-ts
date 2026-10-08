import styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "@/api/user";
import { setToken } from "@/utils/auth";
import { validateLogin } from "@/validations/loginValidation";
import { useAuth } from "@/context/AuthContext";
import Message from "../Message/Message";
import Button from "../Button/Button";

const LoginForm = () => {
  const router = useRouter();
  const { validateUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    const validationError = validateLogin({ email, password });
    if (validationError) {
      setMessage(validationError);
      setError(true);
      return;
    }
    try {
      setSubmitting(true);
      const data = await login({ email, password });
      setToken(data.token);

      await validateUser();

      console.log(data);
      setError(false);
      setMessage("Login successful! Redirecting...");

      // TODO: later remove the setTimout and show message in /boards
      setTimeout(() => {
        router.push("/boards");
      }, 1000);
    } catch (error) {
      console.log("Login error", error);
      setError(true);
      setMessage("Bad email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <h1>Login to Moodboard</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMessage("");
            setError(false);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setMessage("");
            setError(false);
          }}
        />

        <Button title="Login" onClick={handleLogin} isLoading={isSubmitting} />

        {message && <Message text={message} isError={isError} />}
      </div>
    </div>
  );
};

export default LoginForm;
