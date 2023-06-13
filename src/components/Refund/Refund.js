import React from "react";
import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { database } from "@/lib/firebase";
import styles from "../Refund/Refund.module.css";

const RefundOrders = () => {
  const [snapshot, loading, error] = useList(ref(database, "refund"));

  if (loading) {
    return (
      <p>
        <strong>Загрузка...</strong>
      </p>
    );
  }

  if (error) {
    return (
      <p>
        <strong>Ошибка:</strong> {error.message}
      </p>
    );
  }

  return (
    <div>
      <h1>Возврат</h1>
      <ul>
        {/* {snapshot.map((order) => (
          <li key={order.key}>
            {order.key}:{" "}
            {`${order.val().firstName} ${order.val().lastName} ${
              order.val().address
            }`}
          </li>
        ))} */}

        {/* Тестович */}
        <li>
          <p>
            <strong>ФИО: </strong> Тестовый Тест Тестович
          </p>
          <p>
            <strong>Адрес: </strong> Тестовая
          </p>
          <p>
            <strong>Телефон: </strong> +7(123)456-78-90
          </p>
          <p>
            <strong>Дата покупки: </strong> 12.06.2023, 11:27
          </p>
          <p>
            <strong>Товар: </strong> Лампа настольная ЭРА Эра
          </p>
          <p>
            <strong>Причина возврата: </strong> Не понравилась
          </p>
        </li>

        <div style={{ height: "50px" }} />

        {/* Иванов */}
        <li>
          <p>
            <strong>ФИО: </strong> Иванов Руслан Альбертович
          </p>
          <p>
            <strong>Адрес: </strong> Майская
          </p>
          <p>
            <strong>Телефон: </strong> +7(922)333-44-55
          </p>
          <p>
            <strong>Дата покупки: </strong> 12.06.2023, 11.06.2023, 17:38
          </p>
          <p>
            <strong>Товар: </strong> Обеденный сервиз NORBERG
          </p>
          <p>
            <strong>Причина возврата: </strong> Не соответствует описанию
          </p>
        </li>
      </ul>

      <div style={{ height: "50px" }} />
    </div>
  );
};

export default RefundOrders;
