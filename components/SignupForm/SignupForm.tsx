import styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { signup } from "@/api/user";
import { setToken } from "@/utils/auth";
import { validateSignup } from "@/validations/signupValidation";
import { useAuth } from "@/context/AuthContext";

import Message from "../Message/Message";
import Button from "../Button/Button";

const SignupForm = () => {
  const router = useRouter();
  const { validateUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSignup = async () => {
    const validationError = validateSignup({ name, email, password });
    if (validationError) {
      setMessage(validationError);
      setError(true);
      return;
    }

    try {
      setSubmitting(true);
      const data = await signup({ name, email, password });
      setToken(data.token);

      await validateUser();

      console.log(data);
      setError(false);
      setMessage("Sign up successful! Redirecting...");
      // TODO: later remove the setTimout and show message in /boards
      setTimeout(() => {
        router.push("/boards");
      }, 1000);
    } catch (error) {
      console.log("Sign up error", error);
      setError(true);
      setMessage("Error creating account");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <h1>Create an Account</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setMessage("");
            setError(false);
          }}
        />
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

        <Button
          title="Sign up"
          onClick={handleSignup}
          isLoading={isSubmitting}
        />

        {message && <Message text={message} isError={isError} />}
      </div>
    </div>
  );
};

export default SignupForm;
