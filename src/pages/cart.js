import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "../lib/auth";
import styles from "../styles/CartPage.module.css";
import Link from "next/link";

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
        // remove the item if its quantity is 1 or less
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
                    <img src={item.image[0]} alt={item.name} />
                  </div>
                  <div className={styles.details}>
                    <h2 className={styles.name}>{item.name}</h2>
                    <p className={styles.price}>
                      {item.price.toLocaleString()} руб.
                    </p>
                    <div className={styles.quantity}>
                      <button
                        onClick={() => decrementQuantity(index)}
                        className={styles.button}
                      >
                        -
                      </button>
                      <span className={styles.value}>{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(index)}
                        className={styles.button}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(index)}
                      className={styles.remove}
                    >
                      Удалить
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.total}>
              <p>Итого: {total.toLocaleString()} руб.</p>
              {isAuthenticated ? (
                <Link
                  className={`${styles.button} ${styles.checkout_btn}`}
                  href="/checkout"
                >
                  Оформить заказ
                </Link>
              ) : (
                <p className={styles.auth}>
                  Для оформления заказа необходимо{" "}
                  <a href="/account">войти в аккаунт</a>
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
