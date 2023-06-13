import Link from "next/link";
import React, { useEffect } from "react";
import styles from "../Orders/styles/SuccessOrder.module.css";
import confetti from "canvas-confetti";
import { MotionButton } from "../MotionButton/MotionButton";

const SuccessOrder = () => {
  useEffect(() => {
    const confettiConfig = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      gravity: 4,
    };

    setTimeout(() => {
      confetti(confettiConfig);
    }, 800);

    return () => {};
  }, []);

  return (
    <main className={styles.page}>
      <h1 className={styles.success}>✅</h1>
      <h1 className={styles.title}>Заказ успешно оформлен!</h1>
      <div className={styles.links}>
        <MotionButton>
          <Link href={"/orders"} className={styles.link}>
            Перейти к заказам
          </Link>
        </MotionButton>
        <MotionButton>
          <Link href={"/products"} className={styles.link}>
            Продолжить покупки
          </Link>
        </MotionButton>
      </div>
    </main>
  );
};

export default SuccessOrder;
