import React, { useState, useEffect } from "react";
import { useAuth } from "../../lib/auth";
import { ref, getDatabase, onValue } from "firebase/database";
import styles from "../Orders/OrdersList.module.css";

const UserOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const isAuthenticated = !!user;

  useEffect(() => {
    if (isAuthenticated) {
      const dbRef = ref(getDatabase());
      const ordersRef = ref(getDatabase(), `orders/${user.uid}`);
      onValue(ordersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const ordersArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setOrders(ordersArray);
        }
      });
    }
  }, [isAuthenticated, user]);

  return (
    <>
      <h1>Мои заказы</h1>
      {isAuthenticated ? (
        <div className={styles.orders}>
          {orders.length === 0 ? (
            <p>У вас пока нет заказов</p>
          ) : (
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {orders.map((order) => (
                <div
                  key={order.id}
                  className={styles.card}
                  style={{ width: "500px", marginRight: "20px" }}
                >
                  <h2>Детали заказа</h2>
                  {/* <p>Дата заказа: {order.date}</p> */}
                  <p>Имя: {order.firstName}</p>
                  <p>Фамилия: {order.lastName}</p>
                  <p>Отчество: {order.patronymic}</p>
                  <p>Адрес: {order.address}</p>
                  <p>Электронная почта: {order.email}</p>
                  {order.items ? (
                    <>
                      <h3>Товары:</h3>
                      <ul>
                        {order.items.map((item) => (
                          <li key={item.id}>
                            {item.title} - {item.quantity} x {item.price} руб.
                          </li>
                        ))}
                      </ul>
                      <p>Итого: {order.total} руб.</p>
                    </>
                  ) : (
                    <p>Товары не найдены</p>
                  )}
                </div>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p>Вы должны быть авторизованы, чтобы просматривать свои заказы</p>
      )}
    </>
  );
};

export default UserOrders;
