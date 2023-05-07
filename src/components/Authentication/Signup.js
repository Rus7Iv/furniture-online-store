// import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../lib/firebase";
// import styles from "../../styles/SingupLogin.module.css";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       setEmail("");
//       setPassword("");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className={styles.signup}>
//       <h1>Регистрация</h1>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <input
//           className={styles.form_input}
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           className={styles.form_input}
//           type="password"
//           placeholder="Пароль"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button className={styles.form_input} type="submit">
//           Зарегистрироваться
//         </button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default Signup;

import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import styles from "../../styles/SingupLogin.module.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className={styles.login}>
      <h1>Регистрация</h1>
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
        <input
          className={styles.form_input}
          type="password"
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className={styles.form_button} type="submit">
          Зарегистрироваться
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
