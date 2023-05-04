// import { useState, useEffect } from "react";
// import Login from "./Login";
// import Signup from "./Signup";

// const Auth = () => {
//   const [showSignup, setShowSignup] = useState(false);
//   // const [isAuthenticated, setIsAuthenticated] = useState(() => {
//   //   const storedValue =
//   //     typeof window !== "undefined" && localStorage.getItem("isAuthenticated");
//   //   return storedValue !== null ? storedValue === "true" : false;
//   // });
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const storedValue =
//       typeof window !== "undefined" && localStorage.getItem("isAuthenticated");
//     setIsAuthenticated(storedValue !== null ? storedValue === "true" : false);
//   }, []);
//   // ==================

//   useEffect(() => {
//     localStorage.setItem("isAuthenticated", isAuthenticated);
//   }, [isAuthenticated]);

//   const handleSuccessfulAuth = () => {
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     localStorage.removeItem("isAuthenticated"); // удаление значения из localStorage
//   };

//   return (
//     <div>
//       {!isAuthenticated && (
//         <div>
//           <button onClick={() => setShowSignup(false)}>Вход</button>
//           <button onClick={() => setShowSignup(true)}>Регистрация</button>
//         </div>
//       )}
//       {showSignup ? (
//         <Signup onSuccessfulAuth={handleSuccessfulAuth} />
//       ) : (
//         <Login onSuccessfulAuth={handleSuccessfulAuth} />
//       )}
//       {isAuthenticated && (
//         <div>
//           <p>Вы авторизованы!</p>
//           <button onClick={handleLogout}>Выход</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Auth;

// ===================================================================================================
// import { useState, useEffect } from "react";
// import Login from "./Login";
// import Signup from "./Signup";

// const Auth = () => {
//   const [showSignup, setShowSignup] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const storedValue =
//       typeof window !== "undefined" && localStorage.getItem("isAuthenticated");
//     setIsAuthenticated(storedValue !== null ? storedValue === "true" : false);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("isAuthenticated", isAuthenticated);
//   }, [isAuthenticated]);

//   const handleSuccessfulAuth = () => {
//     setIsAuthenticated(true);
//     setShowSignup(false);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     localStorage.removeItem("isAuthenticated");
//   };

//   return (
//     <div>
//       {isAuthenticated ? (
//         <div>
//           <p>Вы авторизованы!</p>
//           <button onClick={handleLogout}>Выход</button>
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
    <div>
      {isAuthenticated ? (
        <div>
          <Account />
        </div>
      ) : (
        <div>
          <button onClick={() => setShowSignup(false)}>Вход</button>
          <button onClick={() => setShowSignup(true)}>Регистрация</button>
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
