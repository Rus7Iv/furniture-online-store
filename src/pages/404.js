import Footer from "@/components/Footer/Footer";
import Navigation from "@/components/Navigation/Navigation";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/404.module.css";

export default function Custom404() {
  const router = useRouter();

  return (
    <>
      <Navigation />
      <main className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>404 - Страница не найдена</h1>
          <p className={styles.text}>
            Кажется, вы попали на страницу, которой не существует. Пожалуйста,
            вернитесь на{" "}
            <Link href="/" className={styles.link}>
              {" "}
              главную страницу
            </Link>
          </p>
          <button onClick={() => router.back()} className="btns">
            Назад
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
