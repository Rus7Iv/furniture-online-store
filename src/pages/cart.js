import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import { useAuth } from "../lib/auth";
import Link from "next/link";
import styles from "../styles/CartPage.module.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();
  const isAuthenticated = !!user;

  useEffect(() => {
    try {
      const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(existingItems);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const removeItem = (index) => {
    try {
      const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedItems = existingItems.filter((item, i) => i !== index);
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      setCart(updatedItems);
    } catch (error) {
      console.log(error);
    }
  };

  const incrementQuantity = (index) => {
    try {
      const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedItems = [...existingItems];
      if (typeof updatedItems[index].quantity !== "number") {
        updatedItems[index].quantity = 1;
      } else {
        updatedItems[index].quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      setCart(updatedItems);
    } catch (error) {
      console.log(error);
    }
  };

  const decrementQuantity = (index) => {
    try {
      const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedItems = [...existingItems];
      if (
        typeof updatedItems[index].quantity !== "number" ||
        updatedItems[index].quantity === 1
      ) {
        removeItem(index);
        return;
      }
      updatedItems[index].quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      setCart(updatedItems);
    } catch (error) {
      console.log(error);
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Navigation />
      <main>
        <h1>Корзина</h1>
        {cart.length === 0 ? (
          <p className={styles.empty}>Ваша корзина пуста</p>
        ) : (
          <div className={styles.cart}>
            <ul className={styles.items}>
              {cart.map((item, index) => (
                <li key={index} className={styles.item}>
                  <div className={styles.image}>
                    {
                      <Link href={`/products/${item.id}`}>
                        <img src={item.image[0]} alt={item.name} />
                      </Link>
                    }
                  </div>
                  <div className={styles.details}>
                    <Link
                      href={`/products/${item.id}`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <h3 className={styles.name}>{item.title}</h3>
                    </Link>

                    <h4 className={styles.price}>
                      {item.price.toLocaleString()} руб.
                    </h4>
                    <div className={styles.quantity}>
                      <button
                        onClick={() => decrementQuantity(index)}
                        className={`${styles.button} btns`}
                      >
                        -
                      </button>
                      <span className={styles.value}>{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(index)}
                        className={`${styles.button} btns`}
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(index)}
                        className={`${styles.remove} btns`}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.total}>
              <p>Итого: {total.toLocaleString()} руб.</p>
              {isAuthenticated ? (
                <Link
                  className={`${styles.checkout_btn} btns`}
                  href="/checkout"
                >
                  Оформить заказ
                </Link>
              ) : (
                <p
                  className={styles.auth}
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    color: "black",
                  }}
                >
                  Для оформления заказа необходимо{" "}
                  <Link
                    href="/account"
                    style={{
                      color: "black",
                    }}
                  >
                    войти в аккаунт
                  </Link>
                </p>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
