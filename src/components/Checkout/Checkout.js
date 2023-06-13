import React, { useState, useEffect } from "react";
import { useAuth } from "../../lib/auth";
import { getDatabase, ref, push, child, set, get } from "firebase/database";
import { auth, database } from "@/lib/firebase";
import styles from "../Checkout/Checkout.module.css";
import SuccessOrder from "../Orders/SuccessOrder";
import InputMask from "react-input-mask";

const Checkout = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [cart, setCart] = useState([]);
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const [showSuccessOrder, setShowSuccessOrder] = useState(false);

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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const userRef = ref(database, `users/${uid}`);

        get(userRef).then((snapshot) => {
          const data = snapshot.val();
          if (data) {
            setFirstName(data.firstName || "");
            setLastName(data.lastName || "");
            setPatronymic(data.patronymic || "");
            setAddress(data.address || "");
            setPhone(data.phone || "");
          }
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const dbRef = ref(getDatabase());
  const collectionRef = ref(getDatabase(), "orders");

  const handleSubmit = (e) => {
    e.preventDefault();

    const date = new Date();
    const orderDate = date.toLocaleString();

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
      date: orderDate,
    });

    setShowSuccessOrder(true);
    window.scrollTo(0, 0);
    localStorage.setItem("cart", JSON.stringify([]));
    setCart([]);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSave = (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const userRef = ref(database, `users/${uid}`);

    set(userRef, {
      firstName,
      lastName,
      patronymic,
      address,
      phone,
    });
  };

  return (
    <>
      {showSuccessOrder ? (
        <SuccessOrder />
      ) : (
        <div>
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

              <label htmlFor="phone" className={styles.checkout_label}>
                Номер телефона:
                <InputMask
                  mask="+7 (999) 999-99-99"
                  maskChar="_"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.checkout_input}
                  required
                />
              </label>

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
        </div>
      )}
    </>
  );
};

export default Checkout;
