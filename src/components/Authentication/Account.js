import React, { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "../../lib/firebase";
import { MotionButtonIcons } from "../MotionButton/MotionButtonIcons";
import styles from "../Authentication/styles/Account.module.css";

const Account = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
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
        <MotionButtonIcons href={"/cart"} icons={"🛒"} text={"Корзина"} />
        <MotionButtonIcons
          href={"/favorites"}
          icons={"❤️"}
          text={"Избранное"}
        />
        <MotionButtonIcons href={"/orders"} icons={"📝"} text={"Заказы"} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          className={`${styles.logoutButton} btns`}
          onClick={handleLogout}
        >
          Выйти
        </button>
        <Link href={"/settings"} className={styles.settings}>
          Настройки аккаунта
        </Link>
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </main>
  );
};

export default Account;
