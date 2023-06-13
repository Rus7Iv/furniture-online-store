import React, { useState, useEffect } from "react";
import { ref, onValue, getDatabase, set, remove } from "firebase/database";
import styles from "../Orders/styles/OrdersList.module.css";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    const ordersRef = ref(getDatabase(), "orders");

    const onOrdersChange = (snapshot) => {
      const allOrders = [];
      snapshot.forEach((userSnapshot) => {
        userSnapshot.forEach((orderSnapshot) => {
          const order = {
            id: orderSnapshot.key,
            ref: orderSnapshot.ref, // Using the actual Firebase ref
            ...orderSnapshot.val(),
          };
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

  const orderStatuses = ["Обрабатывается", "Отправлен", "Доставлен", "Отменён"];

  const updateOrderStatus = (order, newStatus) => {
    const updatedOrder = {
      ...order,
      status: newStatus,
    };
    delete updatedOrder.ref;
    set(order.ref, updatedOrder);
  };

  const deleteOrder = (order) => {
    remove(order.ref);
    setShowConfirmation(false);
  };

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteConfirmation = (order) => {
    setSelectedOrder(order);
    setShowConfirmation(true);
  };

  const handleCancelConfirmation = () => {
    setSelectedOrder(null);
    setShowConfirmation(false);
  };

  const getStatusButtonStyle = (currentStatus, buttonStatus) => {
    return currentStatus === buttonStatus
      ? styles.yellowButton
      : styles.defaultButton;
  };

  return (
    <div>
      <h1>Список заказов</h1>
      {orders.length === 0 ? (
        <p className={styles.empty}>Нет заказов</p>
      ) : (
        <ul className={styles.orders}>
          {orders.map((order, index) => {
            return (
              <li key={order.id} className={styles.card}>
                <h2>Заказ #{index + 1}</h2>
                <p className={styles.date}>
                  {new Date(order.date).toLocaleDateString()}
                  {", "}
                  {new Date(order.date).toLocaleTimeString("ru", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>
                  <strong>ФИО: </strong>
                  {order.lastName} {order.firstName} {order.patronymic}
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
                    order.items.map((item) => (
                      <li key={item.id}>
                        {item.title} - {item.price} руб. x {item.quantity}
                      </li>
                    ))}
                </ul>
                <div style={{ height: "30px" }} />
                <p>
                  <strong>Стоимость:</strong> {order.total} руб.
                </p>
                <p>
                  <strong>Статус заказа:</strong> {order.status || "не указан"}
                </p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className={styles.statusButtons}>
                    {orderStatuses.map((status) => (
                      <button
                        key={`status-button-${index}-${order.id}-${status}`}
                        className={`${
                          styles.status_btns
                        } btns ${getStatusButtonStyle(order.status, status)}`}
                        onClick={() => updateOrderStatus(order, status)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  className="btns"
                  onClick={() => handleDeleteConfirmation(order)}
                >
                  Удалить
                </button>
                {showConfirmation &&
                  selectedOrder &&
                  selectedOrder.id === order.id && (
                    <div>
                      <p style={{ marginTop: "20px" }}>
                        Вы уверены, что хотите удалить заказ?
                      </p>
                      <div className={styles.confirmationButtons}>
                        <button
                          onClick={() => deleteOrder(selectedOrder)}
                          className="btns"
                          style={{ width: "70px" }}
                        >
                          Да
                        </button>
                        <button
                          onClick={handleCancelConfirmation}
                          className="btns"
                          style={{ width: "70px" }}
                        >
                          Нет
                        </button>
                      </div>
                    </div>
                  )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default OrdersList;
