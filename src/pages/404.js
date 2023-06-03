import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <>
      <Navigation />
      <main>
        <div
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontWeight: "bold" }}>404 - Страница не найдена</h1>
          <p style={{ width: "100%", textAlign: "center", marginTop: "30px" }}>
            Кажется, вы попали на страницу, которой не существует. Пожалуйста,
            вернитесь на{" "}
            <Link
              href="/"
              style={{
                color: "#555",
                textDecoration: "underline",
                fontWeight: "500",
                color: "black",
              }}
            >
              {" "}
              главную страницу
            </Link>
            .
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
