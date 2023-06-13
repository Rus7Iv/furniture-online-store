import React, { useState, useEffect } from "react";
import { useAuth } from "../../lib/auth";
import { getDatabase, ref, onValue, update } from "firebase/database";
import ModalConfirmation from "../ModalConfirmation/ModalConfirmation";
import styles from "../Orders/styles/OrdersList.module.css";

const UserOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [reason, setReason] = useState("");
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
            canCancel:
              value.status === undefined || value.status === "Обрабатывается",
            canRefund: value.status === "Доставлен",
          }));
          setOrders(ordersArray);
        }
      });
    }
  }, [isAuthenticated, user]);

  const cancelOrder = (orderId) => {
    const dbRef = getDatabase();
    const orderRef = ref(dbRef, `orders/${user.uid}/${orderId}`);
    update(orderRef, { status: "Отменён" });
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return {
          ...order,
          status: "Отменён",
          canCancel: false,
        };
      } else {
        return order;
      }
    });
    setOrders(updatedOrders);
    setSelectedOrderId(null);
    setIsCancelModalOpen(false);
  };

  const confirmRefundOrder = () => {
    const dbRef = getDatabase();
    const orderRef = ref(dbRef, `orders/${user.uid}/${selectedOrderId}`);
    update(orderRef, { status: "Возврат" });

    const refundRef = ref(dbRef, `refund/${user.uid}/${selectedOrderId}`);
    onValue(orderRef, (snapshot) => {
      const orderData = snapshot.val();
      if (orderData) {
        update(refundRef, {
          reason,
          ...orderData,
        });
      }
    });
    const updatedOrders = orders.map((order) => {
      if (order.id === selectedOrderId) {
        return {
          ...order,
          status: "Возврат",
          canRefund: false,
        };
      } else {
        return order;
      }
    });
    setOrders(updatedOrders);
    setSelectedOrderId(null);
    setIsRefundModalOpen(false);
  };

  const openCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setSelectedOrderId(null);
    setIsCancelModalOpen(false);
  };

  const openRefundModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsRefundModalOpen(true);
  };

  const closeRefundModal = () => {
    setSelectedOrderId(null);
    setIsRefundModalOpen(false);
  };

  return (
    <>
      {isCancelModalOpen && (
        <ModalConfirmation
          message="Вы уверены, что хотите отменить этот заказ?"
          onConfirm={() => cancelOrder(selectedOrderId)}
          onCancel={closeCancelModal}
        />
      )}
      {isRefundModalOpen && (
        <ModalConfirmation
          message="Вы уверены, что хотите вернуть этот заказ?"
          input={
            <input
              className={styles.input}
              placeholder="Укажите причину возврата"
              onChange={(e) => setReason(e.target.value)}
            />
          }
          onConfirm={confirmRefundOrder}
          onCancel={closeRefundModal}
        />
      )}
      <h1>Мои заказы</h1>
      {isAuthenticated ? (
        <div className={styles.orders}>
          {orders.length === 0 ? (
            <p className={styles.empty_p}>У вас пока нет заказов</p>
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
                  <p className={styles.user_date}>{order.date.slice(0, -3)}</p>
                  <h2 className={styles.title}>Детали заказа</h2>

                  <p>
                    <strong>Имя:</strong> {order.firstName}
                  </p>
                  <p>
                    <strong>Фамилия:</strong> {order.lastName}
                  </p>
                  <p>
                    <strong>Отчество:</strong> {order.patronymic}
                  </p>
                  <p>
                    <strong>Адрес:</strong> {order.address}
                  </p>
                  <p>
                    <strong>Эл. почта:</strong> {order.email}
                  </p>
                  <div style={{ height: "10px" }} />
                  <p>
                    <strong>Статус:</strong> {order.status || "Создан"}{" "}
                  </p>

                  {order.items ? (
                    <>
                      <h3>Товары:</h3>
                      <ul>
                        {order.items.map((item) => (
                          <li key={item.id}>
                            {item.title} - {item.price} руб. x {item.quantity}{" "}
                            шт.
                          </li>
                        ))}
                      </ul>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {order.canCancel && (
                          <button
                            onClick={() => openCancelModal(order.id)}
                            className={`${styles.cancel} btns`}
                          >
                            Отменить заказ
                          </button>
                        )}
                        {order.canRefund && (
                          <button
                            onClick={() => openRefundModal(order.id)}
                            className={`${styles.refund} btns`}
                          >
                            Вернуть заказ
                          </button>
                        )}
                      </div>
                      <div style={{ height: "60px" }} />
                      <p className={styles.price}>
                        <strong>Итого:</strong> {order.total} руб.
                      </p>
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
