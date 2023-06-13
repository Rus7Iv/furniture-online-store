import Footer from "@/components/Footer/Footer";
import Navigation from "@/components/Navigation/Navigation";
import React, { useState, useEffect } from "react";
import { auth, database } from "@/lib/firebase";
import { ref, set, get } from "firebase/database";
import styles from "../styles/Settings.module.css";
import InputMask from "react-input-mask";
import Link from "next/link";

const SettingsPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const userRef = ref(database, `users/${uid}`);

        get(userRef).then((snapshot) => {
          const data = snapshot.val();
          if (data) {
            setFirstName(data.firstName || "");
            setLastName(data.lastName || "");
            setPatronymic(data.patronymic || "");
            setAddress(data.address || "");
            setPhone(data.phone || "");
          }
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const userRef = ref(database, `users/${uid}`);

    set(userRef, {
      firstName,
      lastName,
      patronymic,
      address,
      phone,
    });
  };

  return (
    <>
      <Navigation />
      <main>
        <h1>Настройки аккаунта</h1>
        <div style={{ height: "15px" }} />
        <div className={styles.wrapper}>
          <Link href={"/"} className={styles.link}>
            Сменить пароль
          </Link>
          <form onSubmit={handleSave} className={styles.form}>
            <label style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
              Фамилия:
              <input
                type="text"
                placeholder="Иванов"
                className={styles.input}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
              Имя:
              <input
                type="text"
                placeholder="Иван"
                className={styles.input}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
              Отчество:
              <input
                type="text"
                placeholder="Иванович"
                className={styles.input}
                value={patronymic}
                onChange={(e) => setPatronymic(e.target.value)}
              />
            </label>
            <label style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
              Номер телефона:
              <InputMask
                mask="+7 (999) 999-99-99"
                maskChar="_"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.input}
                required
              />
            </label>
            <label style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
              Адрес:
              <input
                type="text"
                placeholder="Адрес"
                className={styles.input}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="btns"
              style={{ width: "100%", marginLeft: "0", marginTop: "30px" }}
            >
              Сохранить
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SettingsPage;
