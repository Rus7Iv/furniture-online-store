import React, { useState, useEffect } from "react";
import { ref, onValue, getDatabase, child } from "firebase/database";
import { db } from "../../lib/firebase";
import styles from "../Orders/OrdersList.module.css";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    const ordersRef = ref(getDatabase(), "orders");

    const onOrdersChange = (snapshot) => {
      const allOrders = [];
      snapshot.forEach((userSnapshot) => {
        userSnapshot.forEach((orderSnapshot) => {
          const order = orderSnapshot.val();
          allOrders.push(order);
        });
      });
      setOrders(allOrders);
    };

    const unsubscribe = onValue(ordersRef, onOrdersChange);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Список заказов</h1>
      {orders.length === 0 ? (
        <p className={styles.empty}>Нет заказов</p>
      ) : (
        <ul className={styles.orders}>
          {orders.map((order, index) => (
            <li key={index} className={styles.card}>
              <h2>Заказ #{index + 1}</h2>
              <p>
                <strong>Имя:</strong> {order.firstName} {order.lastName}{" "}
                {order.patronymic}
              </p>
              <p>
                <strong>Email:</strong> {order.email}
              </p>
              <p>
                <strong>Адрес:</strong> {order.address}
              </p>
              <h3>Товары:</h3>
              <ul>
                {order.items &&
                  order.items.map((item, i) => (
                    <li key={i}>
                      {item.title} - {item.price} руб. x {item.quantity}
                    </li>
                  ))}
              </ul>
              <p>
                <strong>Итого:</strong> {order.total} руб.
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersList;
