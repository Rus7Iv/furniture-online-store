import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";

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
            <Link href="/" className={styles.link}>
              Главная
            </Link>
            <Link href="/products" className={styles.link}>
              Каталог
            </Link>
            <Link href="/cart" className={styles.link}>
              Корзина
            </Link>
          </Nav>
          {isAuthenticated ? (
            <Link
              href={"/account"}
              className={`${styles.link} ${styles.btn_lk}`}
            >
              Личный кабинет
            </Link>
          ) : (
            <Link
              href={"/account"}
              className={`${styles.link} ${styles.btn_lk}`}
              onClick={() => handleAuthentication(true)}
            >
              Вход
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

// =============================================================================
// =============================================================================

// import React, { useState, useEffect } from "react";
// import {
//   Navbar,
//   Nav,
//   NavDropdown,
//   Container,
//   Form,
//   FormControl,
//   Button,
// } from "react-bootstrap";
// import styles from "../styles/Navbar.module.css";
// import Link from "next/link";

// const Navigation = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const storedValue = localStorage.getItem("isAuthenticated");
//     if (storedValue !== null) {
//       setIsAuthenticated(storedValue === "true");
//     }
//   }, []);

//   const handleAuthentication = (value) => {
//     setIsAuthenticated(value);
//     localStorage.setItem("isAuthenticated", value);
//   };

//   return (
//     <Navbar className={styles.navbar} expand="lg">
//       <Container>
//         <Navbar.Brand href="/">
//           <h1 className={styles.brand}>Furniture</h1>{" "}
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Link href="/" className={styles.link}>
//               Главная
//             </Link>
//             <Link href="/products" className={styles.link}>
//               Каталог
//             </Link>
//             <Link href="/cart" className={styles.link}>
//               Корзина
//             </Link>
//           </Nav>
//           <Form className="d-flex">
//             <FormControl
//               type="search"
//               placeholder="Поиск"
//               className="mr-2"
//               aria-label="Search"
//             />
//             <Button variant="outline-success">Найти</Button>
//           </Form>
//           {isAuthenticated ? (
//             <Link
//               href={"/account"}
//               className={`${styles.link} ${styles.btn_lk}`}
//             >
//               Личный кабинет
//             </Link>
//           ) : (
//             <Link
//               href={"/account"}
//               className={`${styles.link} ${styles.btn_lk}`}
//               onClick={() => handleAuthentication(true)}
//             >
//               Вход
//             </Link>
//           )}
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Navigation;
