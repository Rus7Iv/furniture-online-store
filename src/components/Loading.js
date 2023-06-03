import React from "react";
import styles from "@/styles/ProductPage.module.css";

const Loading = () => {
  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Загрузка...</p>
      </div>
    </main>
  );
};

export default Loading;
