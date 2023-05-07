import React, { useState, useEffect } from "react";
import { auth } from "../../lib/firebase";
import Link from "next/link";
import styles from "../../styles/Account.module.css";

const Account = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Получение информации о пользователе из Firebase Authentication.
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        name: currentUser.displayName,
        address: currentUser.address,
        email: currentUser.email,
      });
    }
  }, []);

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
    <main className={styles.container}>
      <h1 className={styles.title}>
        Добро пожаловать в личный кабинет, {user?.email}!
      </h1>

      <div className={styles.links}>
        <Link href={"/cart"} className={styles.link}>
          <div className={styles.icons}>🛒 </div>
          Корзина
        </Link>
        <Link href={"/favorites"} className={styles.link}>
          <div className={styles.icons}>❤️️ </div>
          Избранное
        </Link>
        <Link href={"/orders"} className={styles.link}>
          <div className={styles.icons}>📝 </div>
          Заказы
        </Link>
      </div>

      <button className={styles.logoutButton} onClick={handleLogout}>
        Выйти
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </main>
  );
};

export default Account;
