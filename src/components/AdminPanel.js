import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { useRouter } from "next/router";
import styles from "@/styles/AdminPanel.module.css";

const AdminPanel = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [room, setRoom] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);

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
    setTitle("");
    setDescription("");
    setImage("");
    setRoom("");
    setCategory("");
    setPrice("");
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(collection(db, "products"), id));
    fetchProducts();
  };

  const editProduct = async (e) => {
    e.preventDefault();
    const productRef = doc(collection(db, "products"), editProductId);
    await updateDoc(productRef, {
      title,
      description,
      image: image.split(","),
      room,
      category,
      price: parseFloat(price),
    });
    setTitle("");
    setDescription("");
    setImage("");
    setRoom("");
    setCategory("");
    setPrice("");
    setEditProductId(null);
    fetchProducts();
  };

  const startEditing = (product) => {
    setTitle(product.title);
    setDescription(product.description);
    setImage(product.image.join(","));
    setRoom(product.room);
    setCategory(product.category);
    setPrice(product.price);
    setEditProductId(product.id);
  };

  useEffect(() => {
    fetchProducts();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.email !== "test@test.ru") {
          auth.signOut();
          router.push("/");
        }
      } else {
        router.push("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Панель администратора</h1>
      <h2 className={styles.title}>Добавить товар</h2>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
          <textarea
            type="text"
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
          />
          <textarea
            type="text"
            placeholder="Изображения (через запятую)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Комната"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Категория"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Цена"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={styles.input}
          />
          <button
            type="submit"
            className={`${styles.edit_save_btn} btns`}
            onClick={editProductId ? editProduct : addProduct}
          >
            {editProductId ? "Сохранить изменения" : "Добавить товар"}
          </button>
        </div>
      </div>
      <div>
        <h2 className={styles.title}>Список товаров</h2>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Изображения: </p>
            <p className={styles.images_input}>{product.image.join(", ")}</p>
            <p>Комната: {product.room}</p>
            <p>Категория: {product.category}</p>
            <p>Цена: {product.price}</p>
            <button onClick={() => startEditing(product)} className="btns">
              Редактировать
            </button>
            <button onClick={() => deleteProduct(product.id)} className="btns">
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
