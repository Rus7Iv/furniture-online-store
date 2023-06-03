// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import { db } from "../../lib/firebase";
// import styles from "@/components/Orders/Orders.module.css";

// const Order = ({
//   id,
//   firstName,
//   lastName,
//   patronymic,
//   email,
//   address,
//   items,
//   fetchOrders,
// }) => {
//   Order.defaultProps = {
//     items: [],
//   };

//   const [orderStatus, setOrderStatus] = useState("");
//   const [products, setProducts] = useState([]);
//   const [selectedStatus, setSelectedStatus] = useState("");

//   useEffect(() => {
//     const getOrderStatus = async () => {
//       try {
//         const orderRef = doc(db, "orders", id);
//         const orderDoc = await getDoc(orderRef);
//         if (orderDoc.exists()) {
//           setOrderStatus(orderDoc.data().status);
//           setSelectedStatus(orderDoc.data().status);
//         }
//       } catch (error) {
//         console.error("Error getting order status: ", error);
//       }
//     };
//     getOrderStatus();
//   }, [id]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const productsCollection = collection(db, "products");
//       const productsSnapshot = await getDocs(productsCollection);
//       const productList = productsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       console.log("productList", productList);
//       const itemsWithLinks = items.map((item) => ({
//         ...item,
//         productLink: productList.find(
//           (product) => product.id === item.productId
//         )?.link,
//       }));
//       console.log("itemsWithLinks", itemsWithLinks);
//       setProducts(productList);
//     };

//     fetchProducts();
//   }, []);

//   const handleStatusChange = async (status) => {
//     try {
//       const orderRef = doc(db, "orders", id);
//       await updateDoc(orderRef, { status: status });
//       setOrderStatus(status);
//       setSelectedStatus(status);
//     } catch (error) {
//       console.error("Error updating order status: ", error);
//     }
//   };

//   const deleteOrder = async () => {
//     await deleteDoc(doc(db, "orders", id));
//     fetchOrders();
//   };

//   return (
//     <div className={styles.card}>
//       <p>
//         ФИО: {lastName} {firstName} {patronymic}
//       </p>
//       <p>Эл. почта: {email} </p>
//       <p>Адрес: {address} </p>

//       <p>Товары:</p>

//       {items &&
//         items.map((item) => (
//           <p key={item.id}>
//             <Link
//               href={`/products/${item.productId}`}
//               style={{ color: "black" }}
//             >
//               {item.title}
//             </Link>{" "}
//             ({item.quantity})
//           </p>
//         ))}
//       <p>Статус: {orderStatus}</p>
//       <div>
//         <button
//           className={`${styles.statusButton} btns ${
//             selectedStatus === "Обрабатывается" ? styles.selected : ""
//           }`}
//           style={{ borderRadius: "10px 0 0 10px" }}
//           onClick={() => handleStatusChange("Обрабатывается")}
//         >
//           Обрабатывается
//         </button>
//         <button
//           className={`${styles.statusButton} btns ${
//             selectedStatus === "Отправлен" ? styles.selected : ""
//           }`}
//           onClick={() => handleStatusChange("Отправлен")}
//         >
//           Отправлен
//         </button>
//         <button
//           className={`${styles.statusButton} btns ${
//             selectedStatus === "Доставлен" ? styles.selected : ""
//           }`}
//           onClick={() => handleStatusChange("Доставлен")}
//         >
//           Доставлен
//         </button>
//         <button
//           className={`${styles.statusButton} btns ${
//             selectedStatus === "Отменён" ? styles.selected : ""
//           }`}
//           style={{ borderRadius: "0 10px 10px 0" }}
//           onClick={() => handleStatusChange("Отменён")}
//         >
//           Отменён
//         </button>

//         <button onClick={deleteOrder} className="btns">
//           Удалить
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Order;

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import styles from "@/components/Orders/Orders.module.css";

const Order = ({
  id,
  firstName,
  lastName,
  patronymic,
  email,
  address,
  items,
  fetchOrders,
}) => {
  Order.defaultProps = {
    items: [],
  };

  const [orderStatus, setOrderStatus] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const getOrderStatus = async () => {
      try {
        const orderRef = doc(db, "orders", id);
        const orderDoc = await getDoc(orderRef);
        if (orderDoc.exists()) {
          setOrderStatus(orderDoc.data().status);
          setSelectedStatus(orderDoc.data().status);
        }
      } catch (error) {
        console.error("Error getting order status: ", error);
      }
    };
    getOrderStatus();
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("productList", productList);
      const itemsWithLinks = items.map((item) => ({
        ...item,
        productLink: productList.find(
          (product) => product.id === item.productId
        )?.link,
      }));
      console.log("itemsWithLinks", itemsWithLinks);
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const handleStatusChange = async (status) => {
    try {
      const orderRef = doc(db, "orders", id);
      await updateDoc(orderRef, { status: status });
      setOrderStatus(status);
      setSelectedStatus(status);
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteConfirmed = async () => {
    await deleteDoc(doc(db, "orders", id));
    fetchOrders();
    setDeleteModalOpen(false);
  };

  return (
    <div className={styles.card}>
      <p>
        ФИО: {lastName} {firstName} {patronymic}
      </p>
      <p>Эл. почта: {email} </p>
      <p>Адрес: {address} </p>

      <p>Товары:</p>

      {items &&
        items.map((item) => (
          <p key={item.id}>
            <Link
              href={`/products/${item.productId}`}
              style={{ color: "black" }}
            >
              {item.title}
            </Link>{" "}
            ({item.quantity})
          </p>
        ))}
      <p>Статус: {orderStatus}</p>
      <div>
        <button
          className={`${styles.statusButton} btns ${
            selectedStatus === "Обрабатывается" ? styles.selected : ""
          }`}
          style={{ borderRadius: "10px 0 0 10px" }}
          onClick={() => handleStatusChange("Обрабатывается")}
        >
          Обрабатывается
        </button>
        <button
          className={`${styles.statusButton} btns ${
            selectedStatus === "Отправлен" ? styles.selected : ""
          }`}
          onClick={() => handleStatusChange("Отправлен")}
        >
          Отправлен
        </button>
        <button
          className={`${styles.statusButton} btns ${
            selectedStatus === "Доставлен" ? styles.selected : ""
          }`}
          onClick={() => handleStatusChange("Доставлен")}
        >
          Доставлен
        </button>
        <button
          className={`${styles.statusButton} btns ${
            selectedStatus === "Отменён" ? styles.selected : ""
          }`}
          style={{ borderRadius: "0 10px 10px 0" }}
          onClick={() => handleStatusChange("Отменён")}
        >
          Отменён
        </button>

        <button onClick={handleDeleteModalOpen} className="btns">
          Удалить
        </button>
        {deleteModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <p>Вы уверены, что хотите удалить этот заказ?</p>
              <button onClick={handleDeleteConfirmed} className="btns">
                Удалить
              </button>
              <button onClick={handleDeleteModalClose} className="btns">
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
