import React, { useState } from "react";
import { auth } from "../../lib/firebase";

const Account = () => {
  const [error, setError] = useState(null);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // обработать успешный выход из системы
        console.log("Выход из системы выполнен успешно");
      })
      .catch((error) => {
        // обработать ошибку выхода из системы
        console.error("Ошибка выхода из системы:", error);
        setError(error.message);
      });
  };

  return (
    <main>
      <h1>Добро пожаловать в личный кабинет!</h1>
      <button onClick={handleLogout}>Выйти</button>
      {error && <p>{error}</p>}
    </main>
  );
};

export default Account;
