import styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { signup } from "@/api/user";
import { validateSignup } from "@/validations/signupValidation";
import Message from "../Message/Message";
import Button from "../Button/Button";

const SignupForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSignup = async () => {
    const validationError = validateSignup({ name, email, password });
    if (validationError) {
      setMessage(validationError);
      setError(true);
      return;
    }

    try {
      setLoading(true);
      const data = await signup({ name, email, password });

      console.log(data);
      setError(false);
      setMessage("Sign up successful! Redirecting...");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      console.log("Sign up error", error);
      setError(true);
      setMessage("Error creating account");
      setLoading(false);
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

        <Button title="Sign up" onClick={handleSignup} isLoading={isLoading} />

        {message && <Message text={message} isError={isError} />}
      </div>
    </div>
  );
};

export default SignupForm;
