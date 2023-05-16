// import React, { useState, useEffect } from "react";
// import { collection, doc, getDocs } from "firebase/firestore";
// import { db, auth } from "../lib/firebase";
// import { useRouter } from "next/router";
// import "firebase/firestore";

// const AdminPanel = () => {
//   const router = useRouter();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");
//   const [room, setRoom] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [products, setProducts] = useState([]);

//   const fetchProducts = async () => {
//     const productsCollection = collection(db, "products");
//     const productsSnapshot = await getDocs(productsCollection);
//     const productList = productsSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setProducts(productList);
//   };

//   const addProduct = async () => {
//     await db.collection("products").add({
//       title,
//       description,
//       image: image.split(","),
//       room,
//       category,
//       price: parseFloat(price),
//     });
//     fetchProducts();
//   };

//   // Удалить товар из Firestore
//   const deleteProduct = async (id) => {
//     await db.collection("products").doc(id).delete();
//     fetchProducts();
//   };

//   // Проверка аутентификации
//   auth.onAuthStateChanged((user) => {
//     if (user) {
//       if (user.email !== "test@test.ru") {
//         auth.signOut();
//         router.push("/");
//       } else {
//         fetchProducts();
//       }
//     } else {
//       router.push("/");
//     }
//   });

//   return (
//     <div>
//       <h1>Панель администратора</h1>
//       <div>
//         {/* Форма добавления товара */}
//         <h2>Добавить товар</h2>
//         <input
//           type="text"
//           placeholder="Название"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Описание"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Изображения (через запятую)"
//           value={image}
//           onChange={(e) => setImage(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Комната"
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Категория"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Цена"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />
//         <button onClick={addProduct}>Добавить товар</button>
//       </div>
//       <div>
//         {/* Список товаров */}
//         <h2>Список товаров</h2>
//         {products.map((product) => (
//           <div key={product.id}>
//             <h3>{product.title}</h3>
//             <p>{product.description}</p>
//             <p>Изображения: {product.image.join(", ")}</p>
//             <p>Комната: {product.room}</p>
//             <p>Категория: {product.category}</p>
//             <p>Цена: {product.price}</p>
//             <button onClick={() => deleteProduct(product.id)}>Удалить</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;

import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { useRouter } from "next/router";

const AdminPanel = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [room, setRoom] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    const productList = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productList);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "products"), {
      title,
      description,
      image: image.split(","),
      room,
      category,
      price: parseFloat(price),
    });
    fetchProducts();
    setTitle("");
    setDescription("");
    setImage("");
    setRoom("");
    setCategory("");
    setPrice("");
  };

  // Удалить товар из Firestore
  const deleteProduct = async (id) => {
    await db.collection("products").doc(id).delete();
    fetchProducts();
  };

  // Проверка аутентификации
  auth.onAuthStateChanged((user) => {
    if (user) {
      if (user.email !== "test@test.ru") {
        auth.signOut();
        router.push("/");
      } else {
        fetchProducts();
      }
    } else {
      router.push("/");
    }
  });

  return (
    <div>
      <h1>Панель администратора</h1>
      <div>
        {/* Форма добавления товара */}
        <h2>Добавить товар</h2>
        <form onSubmit={addProduct}>
          <input
            type="text"
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Изображения (через запятую)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            type="text"
            placeholder="Комната"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <input
            type="text"
            placeholder="Категория"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Цена"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button type="submit">Добавить товар</button>
        </form>
      </div>
      <div>
        {/* Список товаров */}
        <h2>Список товаров</h2>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Изображения: {product.image.join(", ")}</p>
            <p>Комната: {product.room}</p>
            <p>Категория: {product.category}</p>
            <p>Цена: {product.price}</p>
            <button onClick={() => deleteProduct(product.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
