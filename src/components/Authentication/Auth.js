// import { useState, useEffect } from "react";
// import Login from "./Login";
// import Signup from "./Signup";
// import { auth } from "../../lib/firebase";
// import Account from "./Account";

// const Auth = () => {
//   const [showSignup, setShowSignup] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setIsAuthenticated(!!user);
//     });
//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("isAuthenticated", isAuthenticated);
//   }, [isAuthenticated]);

//   const handleSuccessfulAuth = () => {
//     setIsAuthenticated(true);
//     setShowSignup(false);
//   };

//   const handleLogout = () => {
//     auth.signOut();
//     setIsAuthenticated(false);
//     localStorage.removeItem("isAuthenticated");
//   };

//   return (
//     <div>
//       {isAuthenticated ? (
//         <div>
//           <Account />
//         </div>
//       ) : (
//         <div>
//           <button onClick={() => setShowSignup(false)}>Вход</button>
//           <button onClick={() => setShowSignup(true)}>Регистрация</button>
//           {showSignup ? (
//             <Signup onSuccessfulAuth={handleSuccessfulAuth} />
//           ) : (
//             <Login onSuccessfulAuth={handleSuccessfulAuth} />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Auth;

import { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { auth } from "../../lib/firebase";
import Account from "./Account";
import styles from "../../styles/Auth.module.css";

const Auth = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const handleSuccessfulAuth = () => {
    setIsAuthenticated(true);
    setShowSignup(false);
  };

  const handleLogout = () => {
    auth.signOut();
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <div className={styles.container}>
      {isAuthenticated ? (
        <div>
          <Account />
          {/* <button className={styles.logoutButton} onClick={handleLogout}>
            Выйти
          </button> */}
        </div>
      ) : (
        <div>
          <button
            className={styles.authButton}
            onClick={() => setShowSignup(false)}
          >
            Вход
          </button>
          <button
            className={styles.authButton}
            onClick={() => setShowSignup(true)}
          >
            Регистрация
          </button>
          {showSignup ? (
            <Signup onSuccessfulAuth={handleSuccessfulAuth} />
          ) : (
            <Login onSuccessfulAuth={handleSuccessfulAuth} />
          )}
        </div>
      )}
    </div>
  );
};

export default Auth;
