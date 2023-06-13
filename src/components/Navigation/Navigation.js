import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import Link from "next/link";
import { MotionButton } from "../MotionButton/MotionButton";
import styles from "../Navigation/Navbar.module.css";

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem("isAuthenticated");
    if (storedValue !== null) {
      setIsAuthenticated(storedValue === "true");
    }
  }, []);

  const handleAuthentication = (value) => {
    setIsAuthenticated(value);
    localStorage.setItem("isAuthenticated", value);
  };

  return (
    <Navbar className={styles.navbar} expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <h1 className={styles.brand}>Furniture</h1>{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <MotionButton>
              <Link href="/" className={styles.link}>
                Главная
              </Link>
            </MotionButton>
            <MotionButton>
              <Link href="/products" className={styles.link}>
                Каталог
              </Link>
            </MotionButton>
            <MotionButton>
              <Link href="/cart" className={styles.link}>
                Корзина
              </Link>
            </MotionButton>
          </Nav>
          {isAuthenticated ? (
            <MotionButton>
              <Link
                href={"/account"}
                className={styles.link}
                style={{
                  fontSize: "20px",
                  textShadow: "2px 2px 6px rgba(0, 0, 0, 0.5)",
                }}
              >
                🏠
              </Link>
            </MotionButton>
          ) : (
            <MotionButton>
              <Link
                href={"/account"}
                className={`${styles.link} ${styles.btn_lk}`}
                onClick={() => handleAuthentication(true)}
              >
                Вход
              </Link>
            </MotionButton>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
