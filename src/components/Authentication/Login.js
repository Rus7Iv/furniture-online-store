import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import Account from "./Account";
import styles from "../Authentication/styles/SingupLogin.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError(
          "Пользовательс таким email не найден. Пожалуйста, проверьте правильность введенного email."
        );
      } else if (err.code === "auth/wrong-password") {
        setError(
          "Неправильный пароль. Пожалуйста, проверьте правильность введенного пароля."
        );
      } else {
        setError("Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.");
      }
    }
  };

  return (
    <div className={styles.container}>
      {isLoggedIn ? (
        <div>
          <Account />
        </div>
      ) : (
        <div className={styles.login}>
          <h1>Вход</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              className={styles.form_input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.form_input}
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={`${styles.form_button} btns`} type="submit">
              Войти
            </button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Login;
