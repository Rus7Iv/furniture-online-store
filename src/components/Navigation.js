// import React, { useState } from "react";
// import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
// import styles from "../styles/Navbar.module.css";
// import Link from "next/link";

// const Navigation = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   // const [isAuthenticated, setIsAuthenticated] = useState(() => {
//   //   const storedValue =
//   //     typeof window !== "undefined" && localStorage.getItem("isAuthenticated");
//   //   return storedValue !== null ? storedValue === "true" : false;
//   // });

//   return (
//     <Navbar className={styles.navbar} expand="lg">
//       <Container>
//         <Navbar.Brand href="/">
//           <h1 className={styles.brand}>Furniture</h1>{" "}
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             {/* <div className={styles.nav_items}> */}
//             <Link href="/" className={styles.link}>
//               Главная
//             </Link>
//             <Link href="/products" className={styles.link}>
//               Каталог
//             </Link>
//             <Link href="/cart" className={styles.link}>
//               Корзина
//             </Link>
//             {/* <NavDropdown
//               title="Sale"
//               id="basic-nav-dropdown"
//               className={styles.link}
//             >
//               <NavDropdown.Item href="#action/3.1">Category</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Catalog</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">Archive</NavDropdown.Item>
//             </NavDropdown> */}
//             {/* </div> */}
//           </Nav>
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
          {/* <Link
            href={"/account"}
            className={`${styles.link} ${styles.btn_lk}`}
            onClick={() => handleAuthentication(true)}
          >
            Вход
          </Link> */}
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
