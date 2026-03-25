import styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "../../api/user";
import { setToken } from "../../utils/auth";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      setMessage("Please fill in all fields");
      return;
    }
    try {
      const data = await login({ email, password });
      setToken(data.token);
      console.log(data);
      setError(false);
      setMessage("Login successful! Redirecting...");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.log("Login error", error);
      setError(true);
      setMessage("Bad email or password");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMessage("");
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setMessage("");
          }}
        />

        <button onClick={handleLogin}>Login</button>
        {message && (
          <div className={isError ? styles.error : styles.success}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
