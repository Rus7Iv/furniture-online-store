// import { useState, useEffect } from "react";
// import {
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { auth } from "../../lib/firebase";
// import styles from "../../styles/SingupLogin.module.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//       }
//     });
//     return unsubscribe;
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       setEmail("");
//       setPassword("");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleLogout = () => {
//     signOut(auth);
//   };

//   return (
//     <div className={styles.login}>
//       <h1>Вход</h1>
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
//           Войти
//         </button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default Login;

import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import styles from "../../styles/SingupLogin.module.css";
import Account from "./Account";

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
      setError(err.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className={styles.container}>
      {isLoggedIn ? (
        <div>
          <Account />
          {/* <button className={styles.logoutButton} onClick={handleLogout}>
            Выйти
          </button> */}
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
            <button className={styles.form_button} type="submit">
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
