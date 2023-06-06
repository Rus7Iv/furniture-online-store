import React, { useState, useEffect } from "react";
import { useAuth } from "../lib/auth";
import styles from "../styles/CheckoutPage.module.css";
import { getDatabase, ref, push, child } from "firebase/database";

const Checkout = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
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

  useEffect(() => {
    if (isAuthenticated) {
      setEmail(user.email);
    }
  }, [isAuthenticated, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dbRef = ref(getDatabase());
    const collectionRef = ref(getDatabase(), "orders");
    const newOrderRef = push(child(collectionRef, user.uid), {
      firstName,
      lastName,
      patronymic,
      address,
      email,
      items: cart.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
    });

    // очистка корзины
    localStorage.setItem("cart", JSON.stringify([]));
    setCart([]);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <h1>Оформление товара</h1>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit} className={styles.checkout_form}>
          <label htmlFor="lastName" className={styles.checkout_label}>
            Фамилия:
          </label>
          <input
            className={styles.checkout_input}
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Иванов"
          />

          <label htmlFor="firstName" className={styles.checkout_label}>
            Имя:
          </label>
          <input
            className={styles.checkout_input}
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="Иван"
          />

          <label htmlFor="patronymic" className={styles.checkout_label}>
            Отчество:
          </label>
          <input
            className={styles.checkout_input}
            type="text"
            id="patronymic"
            name="patronymic"
            value={patronymic}
            onChange={(e) => setPatronymic(e.target.value)}
            required
            placeholder="Иванович"
          />

          <label htmlFor="email" className={styles.checkout_label}>
            Электронная почта:
          </label>
          <input
            className={styles.checkout_input}
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@example.ru"
          />

          <label htmlFor="address" className={styles.checkout_label}>
            Адрес доставки:
          </label>
          <textarea
            className={styles.checkout_input}
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <div className={styles.cart}>
            <h2>Корзина</h2>
            {cart.length === 0 ? (
              <p className={styles.empty}>Ваша корзина пуста</p>
            ) : (
              <ul className={styles.items}>
                {cart.map((item, index) => (
                  <li key={index} className={styles.item}>
                    <div className={styles.image}>
                      <img src={item.image[0]} alt={item.name} />
                    </div>
                    <div className={styles.details}>
                      <h3 className={styles.name}>{item.name}</h3>
                      <p className={styles.price}>
                        {item.price.toLocaleString()} руб. x {item.quantity}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className={styles.total}>
              <p>Итого: {total.toLocaleString()} руб.</p>
            </div>
          </div>
          <button type="submit" className={styles.checkout_button}>
            Оформить заказ
          </button>
        </form>
      </div>
    </>
  );
};

export default Checkout;
