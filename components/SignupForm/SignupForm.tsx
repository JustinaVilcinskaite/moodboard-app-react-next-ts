import styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { signup } from "@/api/user";
import { setToken } from "@/utils/auth";
import { validateSignup } from "@/validations/signupValidation";
import { useAuth } from "@/context/AuthContext";

import Message from "../Message/Message";
import Button from "../Button/Button";
import AuthRedirectLink from "../AuthRedirectLink/AuthRedirectLink";

const SignupForm = () => {
  const router = useRouter();
  const { validateUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSignup = async () => {
    const validationError = validateSignup({ name, email, password });
    if (validationError) {
      setMessage(validationError);
      return;
    }

    setMessage("");

    try {
      setSubmitting(true);
      const data = await signup({ name, email, password });
      setToken(data.token);

      await validateUser();

      await router.push("/boards");
    } catch (error) {
      console.log("Sign up error", error);
      setMessage("Error creating account");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <h1>Create an Account</h1>

        <label className={styles.formGroup}>
          <span>Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setMessage("");
            }}
          />
        </label>

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

        <Button
          title="Sign up"
          onClick={handleSignup}
          isLoading={isSubmitting}
        />
        <AuthRedirectLink
          text="Already have an account?"
          linkText="Log in"
          href="/login"
        />

        <div className={styles.messageWrapper}>
          {message && <Message text={message} isError={true} />}
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
