import styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "@/api/user";
import { setToken } from "@/utils/auth";
import { validateLogin } from "@/validations/loginValidation";
import { useAuth } from "@/context/AuthContext";
import Message from "../Message/Message";
import Button from "../Button/Button";
import AuthRedirectLink from "../AuthRedirectLink/AuthRedirectLink";

const LoginForm = () => {
  const router = useRouter();
  const { validateUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    const validationError = validateLogin({ email, password });
    if (validationError) {
      setMessage(validationError);

      return;
    }

    setMessage("");
    try {
      setSubmitting(true);
      const data = await login({ email, password });
      setToken(data.token);

      await validateUser();

      await router.push("/boards");
    } catch (error) {
      console.log("Login error", error);

      setMessage("Bad email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <h1>Log in to Moodboard</h1>

        <label className={styles.formGroup}>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage("");
            }}
          />
        </label>

        <label className={styles.formGroup}>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setMessage("");
            }}
          />
        </label>

        <Button title="Log in" onClick={handleLogin} isLoading={isSubmitting} />

        <AuthRedirectLink
          text="Don't have an account?"
          linkText="Sign up"
          href="/signup"
        />

        <div className={styles.messageWrapper}>
          {message && <Message text={message} isError={true} />}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
